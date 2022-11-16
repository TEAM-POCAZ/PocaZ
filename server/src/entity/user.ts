import { RowDataPacket, OkPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import db from '../db/database';

interface UserCreationDto {
  username: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
  artist?: number | string;
}
interface UserUpdateDto {
  id: number;
  email?: string;
  nickname?: string;
  profileImage?: string;
  artist?: number | string;
}
interface UserDto {
  id: number;
  username: string; //nn
  email?: string;
  nickname: string; //nn
  profileImage?: string;
  deleteAt?: string;
  score?: number;
  createAt: string;
  updateAt?: string;
  artist?: number | string;
}

interface IUser extends RowDataPacket, UserDto {} //select용도
type ID = RowDataPacket[] | string;
class User {
  static async selectAll(conn: PoolConnection): Promise<IUser[]> {
    const [users] = await conn.query<IUser[]>('SELECT * FROM User');
    return users;
  }
  static async selectById(conn: PoolConnection, id: number | string) {
    const [user] = await conn.query<IUser[]>(
      'SELECT * FROM User where id = ?',
      [id]
    );
    return user[0];
  }

  static async selectByUsername(conn: PoolConnection, username: string) {
    const [user] = await conn.query<IUser[]>(
      'SELECT * FROM User where username = ?',
      [username]
    );
    return user[0];
  }
  static async create(conn: PoolConnection, user: UserCreationDto) {
    const [{ insertId }] = await conn.query<OkPacket>(
      `INSERT INTO User (username, email, nickname, profileImage, artist)
        VALUES (?,?,?,?,?)`,
      [
        user.username,
        user.email,
        user.nickname ?? nicknameGenerator(6),
        user.profileImage,
        user.artist,
      ]
    );
    return User.selectById(conn, insertId);
  }
  static async update(conn: PoolConnection, user: UserUpdateDto) {
    const query = `UPDATE User SET email = ?, nickname = ?, profileImage = ?, ${
      user.artist !== 'null' ? `artist = ${user.artist} , ` : ''
    } updateAt=now() WHERE id = ?`;
    if (user.artist == 'null') {
      const result = await conn.query<OkPacket>(query, [
        user.email,
        user.nickname,
        user.profileImage,
        user.id,
      ]);
    } else {
      const result = await conn.query<OkPacket>(query, [
        user.email,
        user.nickname,
        user.profileImage,
        user.artist,
        user.id,
      ]);
    }
    const resultUser = await User.selectById(conn, user.id);
    return resultUser;
  }

  static async softDelete(conn: PoolConnection, id: number | string) {
    const [{ affectedRows }] = await conn.query<OkPacket>(
      `UPDATE User
        SET
        deleteAt = now()
      WHERE id = ?`,
      [id]
    );
    return { affectedRows };
  }

  static async softDeleteRollback(conn: PoolConnection, id: number | string) {
    const [{ affectedRows }] = await conn.query<OkPacket>(
      `UPDATE User
        SET
        deleteAt = null
      WHERE id = ?`,
      [id]
    );
    return { affectedRows };
  }
  static isSoftDeleted(user: UserDto) {
    return !!user.deleteAt;
  }

  static async hardDelete(conn: PoolConnection, id: number | string) {
    const [{ affectedRows }] = await conn.query<OkPacket>(
      `DELETE FROM User
      WHERE id = ?`,
      [id]
    );
    return { affectedRows };
  }
}
function nicknameGenerator(length: number) {
  const jobs = [
    [
      '도둑',
      '연쇄절도범',
      '수호자',
      '담당일진',
      '약탈자',
      '방문판매원',
      '파괴자',
      '테러범',
      '교제사실을들킨',
      '뺏어먹는',
      '관찰자',
      '밑장빼기9단',
      '추종자',
      '셔틀',
      '지배자',
      '사재기빌런',
      '갈취왕',
      '단속반',
      '스틸러',
    ],
    [
      '카사노바',
      '소리없는방귀빌런',
      '절대강자',
      '노숙자',
      '진상손님',
      '술고래',
      '터줏대감',
      '트월킹머신',
      '관짝춤머신',
      '화장실문지기',
      '탈모인협회장',
      '지박령',
      '푸드파이터',
      '잔반처리반',
      '앞을서성이는',
      '청소부장',
      '앞에서절두번하는',
      '축구대회태클마스터',
      '에서코딱지파다가뒤통수맞는',
      '개미핥기조련사',
      '공문서위조마스터',
      '층간소음마스터',
      '화장실변기뚜껑닫고볼일보는',
    ],
  ];
  // 화장실변기뚜껑닫고볼일보는 -> 화장실 예외처리

  const locations = [
    [
      '노인정',
      '사우나',
      '성인용품점',
      '러브호텔',
      '피시방',
      '국어학원',
      '수학학원',
      '영어학원',
      '과학학원',
      '기숙학원',
      '기숙사',
      '독서실',
      '대형마트',
      '스터디카페',
      '노약자석',
      '임산부석',
      '장애인석',
      '대형마트시식코너',
      '경찰서',
      '대중목욕탕',
      '무료급식소',
      '초등학교',
      '중학교',
      '고등학교',
      '편의점',
      '학원가',
      '세탁소',
      '풋살장',
      '미용실',
      '찜질방',
      '동사무소',
      '전통시장',
      '태권도장',
      '놀이터',
      '헬스장',
      '할매순댓국밥',
      '버스정류장',
      '삼성프라자',
      '국회의사당',
      '흡연실',
      '아파트관리사무소',
      '생활관',
      '서점',
      '도서관',
      '급식실',
      '휴대폰대리점',
      '주유소',
      '공원',
      '에버랜드',
      '롯데월드',
      '지하철',
      '지하철역',
      '시내버스',
      '고속버스',
      '중화반점',
      '동대문시장',
      '맘스터치',
      '맥도날드',
      '롯데리아',
      '우정사업본부',
      '산채비빔밥먹는스님앞에서',
      '길고양이급식소',
      '휴지통속',
      '반찬가게',
      '동물원',
      '왁싱샵',
      '노인복지관',
      '공중화장실',
      '설빙',
      '배스킨라빈스',
      '피자스쿨',
    ],
    [
      '포식자',
      'AD',
      '수능시험장',
      '결국사람',
      '펩시',
      '유모차레이스',
      '냉탕에오줌싸서',
      '스키장상급자코스',
      '고구려대학교',
      '수능갤러리',
      '공사장',
      '군부대',
      '훈련소',
      '롯데마트',
      '시공의폭풍',
      '웹툰미리보기사이트',
      '파인애플피자',
      '주식',
      '비트코인',
      '도박',
      '토토',
      '대학원연구실',
      '온라인클래스',
      '시대에',
      'ISIS',
      '머리카락못내밀면서',
      '다이어트하는친구',
      '지구평면설',
      '붕어빵에',
      '자택에서',
      '교회에서',
      '절에서',
      '연애경험이',
      '친구에어팟',
      '택시타고',
      '게임의폭력성을이해하기위해',
      '배고파서',
      '배고프면',
      '벽돌집벽돌',
      '고깃집공깃밥',
      '뻐꾸기훔쳐가려고',
      '최종학력',
      '고시원냉장고김치통',
    ],
  ];

  const arr = [
    '포식자',
    'AD',
    '수능시험장',
    '결국사람',
    '펩시',
    '유모차레이스',
    '냉탕에오줌싸서',
    '스키장상급자코스',
    '고구려대학교',
    '수능갤러리',
    '공사장',
    '군부대',
    '훈련소',
    '롯데마트',
    '시공의폭풍',
    '웹툰미리보기사이트',
    '파인애플피자',
    '주식',
    '비트코인',
    '도박',
    '토토',
    '대학원연구실',
    '온라인클래스',
    '시대에',
    'ISIS',
    '머리카락못내밀면서',
    '다이어트하는친구',
    '지구평면설',
    '붕어빵에',
    '자택에서',
    '교회에서',
    '절에서',
    '연애경험이',
    '친구에어팟',
    '택시타고',
    '게임의폭력성을이해하기위해',
    '배고파서',
    '배고프면',
    '벽돌집벽돌',
    '고깃집공깃밥',
    '뻐꾸기훔쳐가려고',
    '최종학력',
    '고시원냉장고김치통',
  ] as const;
  // 비활성화:  '아이언', '실버', '골드', '떡볶이', '엽떡', '베라맛보기스푼으로', '싸이월드도토리'
  /* 목록이 길어져서 분리
  작성규칙:
  인덱스 0 : 장소
  인덱스 1 : 특별한 위치 변수 정의용(장소가 아님)
  * 인덱스 0 마지막 콤마(,) 잃어버리지 않게 조심
  */

  const specificLocations = {
    수능갤러리: ['삼수생', true],
    공사장: ['안전모도둑', true],
    웹툰미리보기사이트: ['업로더', true],
    냉탕에오줌싸서: ['온탕으로바꾸는', false],
    군부대: ['전화선절단범', true],
    훈련소: ['에서탄피하나잃어버린', false],
    수능시험장: ['에서소리지르는', false],
    포식자: ['정글유미원챔', false],
    AD: ['원딜티모원챔', false],
    펩시: ['가핏속에흐르는', true],
    유모차레이스: ['4관왕', true],
    롯데마트: ['쇼핑카트뺑소니현행범', true],
    스키장상급자코스: ['앞구르기장인', true],
    결국사람: ['이름이되지못한', false],
    시공의폭풍: ['속으로빨려들어간', false],
    파인애플피자: ['위에민트초코올려먹는', false],
    주식: ['으로일가족전재산을날려버린', false],
    비트코인: ['으로일가족전재산을날려버린', false],
    도박: ['으로일가족전재산을날려버린', false],
    토토: ['로일가족전재산을날려버린', false],
    아이언: ['의페이커야스오장인', false],
    실버: ['의울프마스터이장인', false],
    골드: ['의테디아펠리오스장인', false],
    대학원연구실: ['커피마스터', false],
    내다버린: ['가문의수치', false],
    시대에: ['뒤쳐진', false],
    ISIS: ['행동대장', false],
    머리카락못내밀면서: ['의견내미는대머리', false],
    다이어트하는친구: ['귀에먹방ASMR트는', false],
    지구평면설: ['을믿는', false],
    붕어빵에: ['붕어없다고진상부리는', false],
    자택에서: ['검거된', false],
    교회에서: ['염불외우는', false],
    절에서: ['주기도문외우는', false],
    연애경험이: ['전무한', false],
    친구에어팟: ['하수구에빠뜨려버리는', false],
    택시타고: ['다섯걸음앞에서내리는', false],
    배고파서: ['치킨집전단지뜯어먹는', false],
    배고프면: ['갈매기밥뺏어먹는', false],
    벽돌집벽돌: ['빼서젠가하는', false],
    고깃집공깃밥: ['만먹고이쑤시개쓸어가는', false],
    뻐꾸기훔쳐가려고: ['12시까지뻐구기시계앞에서서성이는', false],
    최종학력: ['이피자스쿨인', false],
    고시원냉장고김치통: ['에설사약섞는', false],
  };

  const objects = [
    '수건',
    '때밀이수건',
    '할머니때밀이수건',
    '흑돌',
    '백돌',
    '노트',
    '교재',
    '연필심',
    '샤프심',
    '휴대폰충전기',
    '마우스',
    '지우개',
    '테이저건',
    '분필',
    '젓가락',
    '잔디',
    '바리깡',
    '틀니',
    '잼민이휴대폰',
    '할아버지지팡이',
    '종이컵',
    '비타민',
    '리코더',
    '줄넘기',
    '프로틴',
    '다데기',
    '탈모치료제',
    '생각하는의자',
    '단무지',
    '진라면순한맛',
    '짝퉁명품',
    '진동벨',
    '이쑤시개',
    '영양갱',
    '계란장수계란',
    '씹던껌',
    '고양이사료',
    '개사료',
    '휴지쪼가리',
    '냅킨',
    '락앤락통',
    '슬리퍼',
    '가발',
    '곽티슈',
    '케찹',
    '빨대',
    '마스크',
    '이유식',
    '에어컨',
    '연유',
    '돋보기',
    '홈런볼',
    '캐스터네츠',
    '숟가락',
    '파마산가루',
  ];

  const exampleNames = [
    '엄준식',
    '박종현',
    '유현재',
    '고강건',
    '안주현',
    '김민식',
    '김준표',
    '오민서',
    '문성수',
    '정지웅',
    '노강민',
    '박상현',
    '김도훈',
  ];
  // '정지웅', '노강민'

  /* 인구순 나열 (동탄 제외) */
  const exampleLocations = [
    '동탄',
    '서울',
    '부산',
    '인천',
    '대구',
    '대전',
    '광주',
    '울산',
    '제주',
    '수원',
    '고양',
    '용인',
    '창원',
    '성남',
    '청주',
    '부천',
    '화성',
    '남양주',
    '전주',
    '천안',
    '안산',
    '안양',
  ];
  const _f = [
    function (string: any) {
      //을/를 구분
      return _hasJong(string) ? '을' : '를';
    },
    function (string: any) {
      //은/는 구분
      return _hasJong(string) ? '은' : '는';
    },
    function (string: any) {
      //이/가 구분
      return _hasJong(string) ? '이' : '가';
    },
    function (string: any) {
      //와/과 구분
      return _hasJong(string) ? '과' : '와';
    },
  ];
  const _formats = {
    '을/를': _f[0],
    을: _f[0],
    를: _f[0],
    을를: _f[0],
    '은/는': _f[1],
    은: _f[1],
    는: _f[1],
    은는: _f[1],
    '이/가': _f[2],
    이: _f[2],
    가: _f[2],
    이가: _f[2],
    '와/과': _f[3],
    와: _f[3],
    과: _f[3],
    와과: _f[3],
  };

  function _hasJong(string: any) {
    //string의 마지막 글자가 받침을 가지는지 확인
    string = string.charCodeAt(string.length - 1);
    return (string - 0xac00) % 28 > 0;
  }

  type Format = keyof typeof _formats;

  const josa = {
    c: function (word: string, format: Format) {
      if (typeof _formats[format] === 'undefined') throw 'Invalid format!';
      return _formats[format](word);
    },
    r: function (word: string, format: Format) {
      return word + josa.c(word, format);
    },
  };
  let totalJob: any[] = [];

  for (let i = 0; i < jobs.length; i++) {
    totalJob = totalJob.concat(jobs[i]);
  }

  function generateResult(varName: any, varLocation: any) {
    let result = '';

    if (Math.random() < 0.8) {
      /* 일반 장소 처리 */
      let randomDetailLocation =
        locations[0][Math.floor(Math.random() * locations[0].length)];
      let randomDetailJob =
        totalJob[Math.floor(Math.random() * totalJob.length)];
      // debug: console.log(randomDetailLocation, randomDetailJob)

      // 특별한 문장 정의
      if (randomDetailLocation === '시내버스') {
        if (Math.random() > 0.3) {
          randomDetailLocation =
            Math.floor(Math.random() * 999) + 1 + '번' + randomDetailLocation;
        }
      } else if (randomDetailLocation.indexOf('학교') >= 0) {
        if (Math.random() > 0.5) {
          randomDetailLocation =
            randomDetailLocation +
            (Math.floor(Math.random() * 2) + 1) +
            '학년' +
            (Math.floor(Math.random() * 9) + 1) +
            '반';
        }
      }
      if (
        (randomDetailLocation === '지하철' ||
          randomDetailLocation === '지하철역') &&
        randomDetailJob === '앞에서절두번하는'
      ) {
        // debug: console.log('지하철', '절두번하는')
        while (randomDetailJob === '앞에서절두번하는') {
          // debug: console.log('지하철', '절두번하는', '루프')
          randomDetailJob =
            totalJob[Math.floor(Math.random() * totalJob.length)];
        }
        // debug: console.log('지하철', '절두번하는', randomDetailJob)
      }
      // 특별한 문장 정의 완료

      if (jobs[0].indexOf(randomDetailJob) >= 0) {
        result = generateSpecificCase(1, [
          varLocation,
          randomDetailLocation,
          randomDetailJob,
          varName,
        ]);
      } else if (jobs[1].indexOf(randomDetailJob) >= 0) {
        result = generateSpecificCase(2, [
          varLocation,
          randomDetailLocation,
          randomDetailJob,
          varName,
        ]);
      }
    } else {
      type RandomDetailLocation = typeof arr[number];
      /* 특별한 위치 변수 정의 처리 */
      const randomDetailLocation: string =
        locations[1][Math.floor(Math.random() * locations[1].length)];
      // 여기서 문제가 발생한다면 특별한 위치 변수를 제대로 정의하지 않은것.
      // debug: console.log('specificLocations', specificLocations[randomDetailLocation], randomDetailLocation)

      if (
        specificLocations[
          randomDetailLocation as keyof typeof specificLocations
        ][1]
      ) {
        result = generateSpecificCase(2, [
          varLocation,
          randomDetailLocation,
          specificLocations[
            randomDetailLocation as keyof typeof specificLocations
          ][0],
          varName,
        ]);
      } else {
        result = generateSpecificCase(3, [
          varLocation,
          randomDetailLocation,
          specificLocations[
            randomDetailLocation as keyof typeof specificLocations
          ][0],
          varName,
        ]);
      }
    }
    //debug: console.log(randomDetailLocation, randomDetailJob, result)

    return result;
  }

  /* params = [varLocation, randomDetailLocation, randomDetailJob, varName] */
  function generateSpecificCase(caseCode: any, params: any) {
    if (caseCode === 1) {
      const randomObject = objects[Math.floor(Math.random() * objects.length)];

      // 특별한 문장 정의
      if (params[1] === '산채비빔밥먹는스님앞에서') {
        return params[1] + randomObject + '먹는' + params[3];
      }
      if (params[2] === '교제사실을들킨') {
        return (
          params[0] +
          params[1] +
          josa.r(randomObject, '와/과') +
          params[2] +
          params[3]
        );
      }
      // 특별한 문장 정의 완료

      return params[0] + params[1] + randomObject + params[2] + params[3];
    } else if (caseCode === 2) {
      // 특별한 문장 정의
      if (params[1] === '납골당') {
        params[2] = ['유골항아리도둑', '유골항아리파괴자'][
          Math.floor(Math.random() * 2)
        ];
      }
      // 특별한 문장 정의 완료

      return params[0] + params[1] + params[2] + params[3];
    } else if (caseCode === 3) {
      // 특별한 문장 정의
      if (params[1] === '틀니') {
        params[1] = Math.floor(Math.random() * 11) + 1 + '주' + params[1];
      }
      // 특별한 문장 정의 완료

      if (params[0] === '' || Math.floor(Math.random() * 2) === 0) {
        return params[1] + params[2] + params[3];
      } else {
        if (Math.floor(Math.random() * 2) === 0) {
          return params[1] + params[2] + params[0] + '의아들' + params[3];
        } else {
          return params[1] + params[2] + params[0] + '의딸' + params[3];
        }
      }
    } else {
      return undefined;
    }
  }

  const name = exampleNames[Math.floor(Math.random() * exampleNames.length)];
  const location =
    exampleLocations[Math.floor(Math.random() * exampleLocations.length)];
  return generateResult(name, location);
}

export { User };
export type { IUser, UserCreationDto, UserUpdateDto, UserDto };
