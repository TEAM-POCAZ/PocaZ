-- on current erd agency must put before artist	
-- C
INSERT INTO Agency(name) VALUES ('HYBE'),('IST'),('SM');

-- Artist Group Create
INSERT INTO ArtistGroup(englishName, koreanName, grouplogoUrl) VALUES
(	"LE SSERAFIM", "르세라핌",	"https://media.discordapp.net/attachments/1039076920492560445/1040463357507014726/image.png"),
(	"THE BOYZ",	"더보이즈",	"https://media.discordapp.net/attachments/1039076920492560445/1040465090794766446/image.png"),
(	"newjeans",	"뉴진스",	"https://media.discordapp.net/attachments/1039076920492560445/1040463095157506088/image.png"),
(	"NCT",		"NCT",	"https://media.discordapp.net/attachments/1039076920492560445/1040461815060111410/image.png"),
(	"AESPA",	"에스파",	"https://media.discordapp.net/attachments/1039076920492560445/1040465507289157642/image.png");

-- update ArtistGroup
--  set koreanName = "더 보이즈"
--   where id = 2;
-- update ArtistGroup
--  set koreanName = "뉴진스"
--   where id = 3;
-- update ArtistGroup
--  set koreanName = "NCT"
--   where id = 4;
-- update ArtistGroup
--  set koreanName = "에스파"
--   where id = 5;
-- Artist CRUD;
-- C
-- if foreigner what realName would be choosed?
INSERT INTO Artist (agency, artistGroup, stageName, realName) VALUES
( 1, 1, "김채원", "김채원" ), ( 1, 1, "사쿠라", "미야와키 사쿠라" ), ( 1, 1, "카즈하", "나카무라 카즈하" ), ( 1, 1, "홍은채", "홍은채" ), ( 1, 1, "허윤진", "허윤진" ),
 ( 3, 2, "상연", "이상연" ), ( 3, 2, "제이콥", "배준영" ), ( 3, 2, "영훈", "김영훈" ), ( 3, 2, "현재", "이재현" ), ( 3, 2, "주연", "이주연" ), ( 3, 2, "케빈", "문형서" ), ( 3, 2, "뉴", "최찬희" ),
 ( 3, 2, "큐", "지창민" ), ( 3, 2, "주학년", "주학년" ), ( 3, 2, "선우", "김선우" ), ( 3, 2, "에릭", "손영재" ),
 ( 1, 3, "민지", "김민지" ), ( 1, 3, "하니", "팜 응옥 헌" ), ( 1, 3, "다니엘", "다니엘 마쉬" ), ( 1, 3, "해린", "강해린" ), ( 1, 3, "혜인", "이혜인" ),
 ( 3, 5, "카리나", "유지민" ), ( 3, 5, "지젤", "우치나가 애리" ), ( 3, 5, "윈터", "김민정" ), ( 3, 5, "닝닝", "닝이줘" ),
 ( 2, 4, "태일", "문태일" ), ( 2, 4, "태용", "이태용" ), ( 2, 4, "도영", "김도영" ), ( 2, 4, "재현", "정재현" ), ( 2, 4, "정우", "김정우" ), ( 2, 4, "제노", "이제노" ),
 ( 2, 4, "해찬", "이동혁" ), ( 2, 4, "재민", "나재민" ), ( 2, 4, "성찬", "정성찬" ), ( 2, 4, "지성", "박지성" ), ( 2, 4, "마크", "이민형" ), ( 2, 4, "쟈니", "서영호" ), ( 2, 4, "천러", "종천러" );
-- R
-- SELECT *
--  FROM Artist;
-- U

-- D


-- USER CRUD
-- C
-- INSERT INTO USER (email, nickname, profileImage, artist) VALUES
-- ();

-- desc PostCategory;
-- category
INSERT INTO PostCategory (id, name) VALUES
(1,'자유'),
(2,'자랑');

-- desc Photocard;
INSERT INTO Photocard (artist, path, name, description) VALUES
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039083845749833758/opal_.jpeg?width=392&height=625", "antifragile_iridiscent_opal_1", "antifragile_iridiscent_opal" ),
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039092870235291698/unknown.png?width=397&height=625", "antifragile_midnight_onyx_1", "antifragile_midnight_onyx" ), 
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039093241754173471/unknown.png?width=399&height=625", "antifragile_frozen_aquamarine_1", "antifragile_frozen_aquamarine" ), 
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039100568704135168/image.png?width=403&height=625", "antifragile_musickorea_1", "antifragile_musickorea" ), 
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039083960422121492/FgP0JSJagAENpFj.png?width=401&height=625", "m2_showcase_1", "m2_showcase" ),
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039094571310796800/unknown.png?width=415&height=625", "yes24_fansign_1", "yes24_fansign" ), 
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039102556284137553/image.png?width=406&height=624", "shopee_1st_1", "shopee_1st" ), 
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039111337726455918/image.png?width=404&height=625", "broadcast_2ndweek_1", "broadcast_2ndweek" ),
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1039112767589863486/image.png?width=404&height=625", "broadcast_1stweek_1", "broadcast_1stweek" ),
 ( 1, "https://media.discordapp.net/attachments/1039076920492560445/1040537428315881502/image.png?width=405&height=626", "antifragile_compact_1", "antifragile_compact" ),
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039083845368164473/onyx_.jpeg?width=392&height=624", "antifragile_midnight_onyx_1", "antifragile_midnight_onyx" ),
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039097440160202783/unknown.png?width=393&height=625", "antifragile_iridiscent_opal_1", "antifragile_iridiscent_opal" ),
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039100568381177886/image.png?width=406&height=624", "antifragile_musickorea_1", "antifragile_musickorea" ),
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039083959675539526/FgP0JSJagAENpFj_3.png?width=402&height=625", "m2_showcase_1", "m2_showcase" ),
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039102555852128326/image.png?width=407&height=625", "shopee_1st_1", "shopee_1st" );
 INSERT INTO Photocard (artist, path, name, description) VALUES
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039111336573030430/image.png?width=404&height=625", "broadcast_2ndweek_1", "broadcast_2ndweek" ), 
 ( 2, "https://media.discordapp.net/attachments/1039076920492560445/1039112767216566303/image.png?width=404&height=625", "broadcast_1stweek_1", "broadcast_1stweek" ),
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039083845183602708/3a7400014db9a07e.jpeg?width=410&height=625", "antifragile_compact_1", "antifragile_compact" ), 
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039083844978085989/75e349c72c1ab2be.jpeg?width=389&height=625", "antifragile_weverse_1", "antifragile_weverse" ),
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039083844659327006/a9ceba984e1ad0c6.jpeg?width=401&height=624", "antifragile_frozen_aquamarine_1", "antifragile_frozen_aquamarine" ),
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039094340225613824/unknown.png?width=395&height=625", "antifragile_midnight_onyx_1", "antifragile_midnight_onyx" ), 
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039100569425555466/image.png?width=409&height=625", "antifragile_musickorea_1", "antifragile_musickorea" ),
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039083959356768296/FgP0JSJagAENpFj_2.png?width=417&height=625", "m2_showcase_1", "m2_showcase" ), 
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039097848253399080/unknown.png?width=407&height=625", "yes24_fansign_1", "yes24_fansign" ),
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039102557257203712/image.png?width=406&height=625", "shopee_1st_1", "shopee_1st" ), 
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039111338334638110/image.png?width=405&height=624", "broadcast_2ndweek_1", "broadcast_2ndweek" ), 
 ( 3, "https://media.discordapp.net/attachments/1039076920492560445/1039112768860725299/image.png?width=405&height=624", "broadcast_1stweek_1", "broadcast_1stweek" ), 
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039083845548511293/onyx_.jpeg?width=404&height=625", "antifragile_midnight_onyx_1", "antifragile_midnight_onyx" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039096240689922078/unknown.png?width=404&height=625", "antifragile_midnight_onyx_1", "antifragile_midnight_onyx" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039096241545551883/unknown.png?width=397&height=624", "antifragile_iridiscent_opal_1", "antifragile_iridiscent_opal" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039096241189048361/unknown.png?width=396&height=624", "antifragile_frozen_aquamarine_1", "antifragile_frozen_aquamarine" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039100569861767178/image.png?width=406&height=625", "antifragile_musickorea_1", "antifragile_musickorea" ), 
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039083960027848714/FgP0JSJagAENpFj_4.png?width=411&height=625", "m2_showcase_1", "m2_showcase" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039097847863332895/unknown.png?width=412&height=625", "yes24_fansign_1", "yes24_fansign" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039102557966053386/image.png?width=405&height=625", "shopee_1st_1", "shopee_1st" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039111338645008454/image.png?width=405&height=624", "broadcast_2ndweek_1", "broadcast_2ndweek" ),
 ( 4, "https://media.discordapp.net/attachments/1039076920492560445/1039112768407752744/image.png?width=405&height=624", "broadcast_1stweek_1", "broadcast_1stweek" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039083845959561246/opal_.jpeg?width=395&height=625", "antifragile_iridiscent_opal_1", "antifragile_iridiscent_opal" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039095965136728074/unknown.png?width=396&height=625", "antifragile_midnight_onyx_1", "antifragile_midnight_onyx" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039095965560356874/unknown.png?width=394&height=624", "antifragile_frozen_aquamarine_1", "antifragile_frozen_aquamarine" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039100569069043762/image.png?width=402&height=624", "antifragile_musickorea_1", "antifragile_musickorea" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039083959029604402/FgP0JSJagAENpFj_1.png?width=409&height=624", "m2_showcase_1", "m2_showcase" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039094571612778557/unknown.png?width=407&height=625", "yes24_fansign_1", "yes24_fansign" ), 
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039102556745515070/image.png?width=406&height=624", "shopee_1st_1", "shopee_1st" ), 
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039111338036838400/image.png?width=404&height=625", "broadcast_2ndweek_1", "broadcast_2ndweek" ),
 ( 5, "https://media.discordapp.net/attachments/1039076920492560445/1039112768042844160/image.png?width=404&height=625", "broadcast_1stweek_1", "broadcast_1stweek" );
 INSERT INTO Photocard (artist, path, name, description) VALUES
 ( 17, "https://media.discordapp.net/attachments/1039076920492560445/1039205605967143015/B_.jpg?width=389&height=583", "위버스_앨범_B버전_1", "위버스_앨범_B버전" ), 
 ( 17, "https://media.discordapp.net/attachments/1039076920492560445/1039206623698243705/B_2.jpg?width=389&height=583", "위버스_앨범_B버전_2", "위버스_앨범_B버전" ),
 ( 17, "https://media.discordapp.net/attachments/1039076920492560445/1039205605069561926/A_.jpg?width=381&height=584", "위버스_앨범_A버전_1", "위버스_앨범_A버전" ),
 ( 17, "https://cdn.discordapp.com/attachments/1039076920492560445/1039808158199201802/1.jpeg", "공방_포카_1", "공방_포카" ), 
 ( 18, "https://media.discordapp.net/attachments/1039076920492560445/1039205604767576165/B_4.jpg?width=389&height=583", "위버스_앨범_B버전_1", "위버스_앨범_B버전" ), 
 ( 18, "https://media.discordapp.net/attachments/1039076920492560445/1039205604440416347/B_3.jpg?width=389&height=583", "위버스_앨범_B버전_2", "위버스_앨범_B버전" ),
 ( 19, "https://media.discordapp.net/attachments/1039076920492560445/1039205605728063599/B_.jpg?width=389&height=583", "위버스_앨범_B버전_1", "위버스_앨범_B버전" ),
 ( 19, "https://media.discordapp.net/attachments/1039076920492560445/1039205605384138752/B_2.jpg?width=389&height=583", "위버스_앨범_B버전_2", "위버스_앨범_B버전" ),
 ( 20, "https://media.discordapp.net/attachments/1039076920492560445/1039205603500888074/B_2.jpg?width=389&height=583", "위버스_앨범_B버전_1", "위버스_앨범_B버전" ),
 ( 20, "https://media.discordapp.net/attachments/1039076920492560445/1039205603156963369/B_.jpg?width=389&height=583", "위버스_앨범_B버전_2", "위버스_앨범_B버전" ),
 ( 21, "https://media.discordapp.net/attachments/1039076920492560445/1039205604071313469/B_2.jpg?width=389&height=583", "위버스_앨범_B버전_1", "위버스_앨범_B버전" ),
 ( 21, "https://media.discordapp.net/attachments/1039076920492560445/1039205603760939028/B_.jpg?width=389&height=583", "위버스_앨범_B버전_2", "위버스_앨범_B버전" ), 
 ( 20, "https://cdn.discordapp.com/attachments/1039076920492560445/1039807905244925952/FbtivTdagAAHg8y.jpeg", "New_Jeans_Bluebook.ver_HAERIN.VER_1", "New_Jeans_Bluebook.ver_HAERIN.VER" ), 
 ( 20, "https://cdn.discordapp.com/attachments/1039076920492560445/1039808930970345472/Fe3i9l9WIAI_Aky.jpeg", "위버스_앨범_위버스_앨범_1", "위버스_앨범_위버스_앨범" ),
 ( 20, "https://cdn.discordapp.com/attachments/1039076920492560445/1039808983545950249/Fe3i80FX0AENlMB.jpeg", "위버스_앨범_위버스_앨범_1", "위버스_앨범_위버스_앨범" );
 INSERT INTO Photocard (artist, path, name, description) VALUES
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039105096430141480/86f65322c2f18109.jpeg", "우리_식구_됐어요_우리_식구_됐어요_1", "우리_식구_됐어요_우리_식구_됐어요" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039105259383033856/2.jpeg", "우리_식구_됐어요_우리_식구_됐어요_2", "우리_식구_됐어요_우리_식구_됐어요" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039105659985215528/a983aed7ccbe334b.jpeg", "MAVERICK_팬싸_메이크_스타_1차_1", "MAVERICK_팬싸_메이크_스타_1차" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039106009895030814/2.jpeg", "CHASE_영상통화_팬싸_마뮤테_2차_1", "CHASE_영상통화_팬싸_마뮤테_2차" ), 
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039106382340837437/00111bb47aa57978.jpeg", "떴다 더보이즈_갓생편_폰탭_스트랩_세트_1", "떴다_더보이즈_갓생편_폰탭_스트랩_세트" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039106785040146452/6135a5ed43127cc6.jpeg", "라포티셀_카카오_쇼핑_라이브_특전_1", "라포티셀_카카오_쇼핑_라이브_특전" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039107808651653120/79e2711c85379b47.jpeg", "THE_FILM_FESTIVAL_트레카_4_1", "THE_FILM_FESTIVAL_트레카_4" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039108330515353610/2.jpeg", "CHASE_영상통화_팬싸_위드드라마_2차_1", "CHASE_영상통화_팬싸_위드드라마_2차" ), 
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039108657205493810/4fb6fc76db9a5dfd.jpeg", "BE_AWARE_앨범_KTOWN4U_1차_1", "BE_AWARE_앨범_KTOWN4U_1차" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039109178003828766/DMC.jpeg", "CHASE_영상통화_팬싸_DMC_1차_1", "CHASE_영상통화_팬싸_DMC_1차" ),
 ( 9, "https://cdn.discordapp.com/attachments/1039076920492560445/1039112951287791676/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ),
 ( 8, "https://cdn.discordapp.com/attachments/1039076920492560445/1039109726270664724/881729275ea595a2.jpeg", "MAVERICK_앨범_DOOM.ver_1", "MAVERICK_앨범_DOOM.ver" ),
 ( 8, "https://cdn.discordapp.com/attachments/1039076920492560445/1039113451244625960/2.jpeg", "MAVERICK_앨범_DOOM.ver_2", "MAVERICK_앨범_DOOM.ver" ),
 ( 8, "https://cdn.discordapp.com/attachments/1039076920492560445/1039113631012507668/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ),
 ( 8, "https://cdn.discordapp.com/attachments/1039076920492560445/1039114044776398849/5d48b14015d6f01c.jpeg", "디어_마이_뮤즈_홈키트_2_1", "디어_마이_뮤즈_홈키트_2" ),
 ( 8, "https://cdn.discordapp.com/attachments/1039076920492560445/1039114331842949160/2.jpeg", "CHASE_영상통화_팬싸_마뮤테_2차_1", "CHASE_영상통화_팬싸_마뮤테_2차" ),
 ( 8, "https://cdn.discordapp.com/attachments/1039076920492560445/1039114606905413632/823e554c543067d8.jpeg", "스쿨룩스_스쿨룩스_1", "스쿨룩스_스쿨룩스" ), 
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039116123939020840/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ),
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039116388662517831/48f771a1ba85faea.jpeg", "스쿨룩스_스쿨룩스_1", "스쿨룩스_스쿨룩스" ), 
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039116723095355462/dc5248eb1a488ab6.jpeg", "THE_FIRST_앨범_Fresh.ver_1", "THE_FIRST_앨범_Fresh.ver" ),
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039117146183184474/4a2aa96cb5ac7799.jpeg", "MAVERICK_팬싸_메이크_스타_1차_1", "MAVERICK_팬싸_메이크_스타_1차" ), 
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039117575801548890/8f12017233ba3f68.jpeg", "CHASE_영상통화_팬싸_조은뮤직_특전_1", "CHASE_영상통화_팬싸_조은뮤직_특전" ),
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039117931302359040/dce579ed8377d5d3.jpeg", "CHASE_영상통화_팬싸_미화당_특전_1", "CHASE_영상통화_팬싸_미화당_특전" ), 
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039118204217348156/2.jpeg", "CHASE_영상통화_팬싸_메이크스타_2차_1", "CHASE_영상통화_팬싸_메이크스타_2차" ), 
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039118442210533407/a52cde1960fbba36.jpeg", "CHASE_영상통화_팬싸_뮤직코리아_특전_1", "CHASE_영상통화_팬싸_뮤직코리아_특전" ),
 ( 10, "https://cdn.discordapp.com/attachments/1039076920492560445/1039118673547374592/1da9c6f5516ff722.jpeg", "CHASE_영상통화_팬싸_에버라인_특전_1", "CHASE_영상통화_팬싸_에버라인_특전" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039421246321991722/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039421658160693270/4a2d87f325042850.jpeg", "CHASE_영상통화_팬싸_마뮤테_2차_1", "CHASE_영상통화_팬싸_마뮤테_2차" ),
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039422172529172510/aca14fa38fb6722b.jpeg", "MAVERICK_팬싸_메이크스타_1차_1", "MAVERICK_팬싸_메이크스타_1차" ),
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039424087862300682/43b9ec42039ca627.jpeg", "CHASE_영상통화_팬싸_에버라인_특전_1", "CHASE_영상통화_팬싸_에버라인_특전" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039424445590294569/0bcad7554c794427.jpeg", "CHASE_영상통화_팬싸_미화당_특전_1", "CHASE_영상통화_팬싸_미화당_특전" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039425024282595338/06d741bf9d7107c5.jpeg", "CHASE_영상통화_팬싸_메이크스타_2차_1", "CHASE_영상통화_팬싸_메이크스타_2차" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039425298225176617/e8cee259671ed7b7.jpeg", "CHASE_영상통화_팬싸_DMC_1차_1", "CHASE_영상통화_팬싸_DMC_1차" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039425902595022868/Fgurg_VaEAIG-lG.jpeg", "THE BOYZ WORLD TOUR : THE B-ZONE IN EUROPE_PHOTOCARD SET_1", "THE BOYZ WORLD TOUR : THE B-ZONE IN EUROPE_PHOTOCARD SET" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039426187157590026/EWalceTU8AACh4A.jpeg", "더비_2기_키트_포토카드_2_1", "더비_2기_키트_포토카드_2" ), 
 ( 13, "https://cdn.discordapp.com/attachments/1039076920492560445/1039426457430147083/EWalcb_U8AAGULh.jpeg", "더비_2기_키트_포토카드_1_1", "더비_2기_키트_포토카드_1" ), 
  (15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039426923387957258/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039427208210563082/1.jpeg", "디어마이뮤즈_파자마_1_1", "디어마이뮤즈_파자마_1" ),
 ( 15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039427251172802570/2.jpeg", "디어마이뮤즈_파자마_2_1", "디어마이뮤즈_파자마_2" ),
 ( 15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039428189598011463/5f6ceba5a953bd5b.jpeg", "CHASE_영상통화_팬싸_에버라인_특전_1", "CHASE_영상통화_팬싸_에버라인_특전" ),
 ( 15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039428530716561438/dd31f3093d1e667b.jpeg", "MAVERICK_앨범_STORY BOOK.ver_1", "MAVERICK_앨범_STORY BOOK.ver" ),
 ( 15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039429071819522048/4.jpeg", "더비_4기_키트_포토카드_1_1", "더비_4기_키트_포토카드_1" ), 
 ( 15, "https://cdn.discordapp.com/attachments/1039076920492560445/1039429072033419294/42.jpeg", "더비_4기_키트_포토카드_2_1", "더비_4기_키트_포토카드_2" ), 
 ( 12, "https://cdn.discordapp.com/attachments/1039076920492560445/1039432578551271434/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 12, "https://cdn.discordapp.com/attachments/1039076920492560445/1039434247691309106/REVEAL_ENCORE_EVENT_-_Time_of_CALL.png", "REVEAL_영상통화_팬싸_애플뮤직_특전_1", "REVEAL_영상통화_팬싸_애플뮤직_특전" ), 
 ( 12, "https://cdn.discordapp.com/attachments/1039076920492560445/1039436843088891914/a232d8ad2cdea6ef.jpeg", "CHASE_영상통화_팬싸_미화당_특전_1", "CHASE_영상통화_팬싸_미화당_특전" ),
 ( 12, "https://cdn.discordapp.com/attachments/1039076920492560445/1039437553486544896/2bac0ae057d34fc2.jpeg", "CHASE_영상통화_팬싸_에버라인_특전_1", "CHASE_영상통화_팬싸_에버라인_특전" ),
 ( 12, "https://cdn.discordapp.com/attachments/1039076920492560445/1039438081671041024/ErAoU_eXUAU6Gtw.jpeg", "CHASE_앨범_Stealer.ver_티켓_1", "CHASE_앨범_Stealer.ver_티켓" ), 
 ( 12, "https://cdn.discordapp.com/attachments/1039076920492560445/1039438328539389984/07cf3a5ecc2b702c.jpeg", "CHASE_영상통화_팬사_위드드라마_2차_1", "CHASE_영상통화_팬사_위드드라마_2차" ), 
 ( 14, "https://cdn.discordapp.com/attachments/1039076920492560445/1039438921802731520/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 14, "https://cdn.discordapp.com/attachments/1039076920492560445/1039439017994891314/REVEAL_ENCORE_EVENT_-_Time_of_CALL.png", "REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카_1", "REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카" ), 
 ( 14, "https://cdn.discordapp.com/attachments/1039076920492560445/1039441442856251452/e5dc063d5e98cb32.jpeg", "크리스마씨_MD_스티커팩_1", "크리스마씨_MD_스티커팩" ), 
 ( 14, "https://cdn.discordapp.com/attachments/1039076920492560445/1039441877801385994/cb9f89e447a2d135.jpeg", "CHASE_영상통화_팬싸_미화당_특정_1", "CHASE_영상통화_팬싸_미화당_특정" ),
 ( 14, "https://cdn.discordapp.com/attachments/1039076920492560445/1039442221495230484/2ec591e1b40688ac.jpeg", "2021_시즌그리팅_에버라인_1", "2021_시즌그리팅_에버라인" ), 
 ( 14, "https://cdn.discordapp.com/attachments/1039076920492560445/1039442885919125514/0128d30a43846e27.jpeg", "CHASE_영상통화_팬싸_DMC_2차_1", "CHASE_영상통화_팬싸_DMC_2차" ),
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039443150915260467/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039443864395730954/FCElW4eXoAsQimO.jpeg", "THRILL_ING_앨범_Bang.ver_1", "THRILL_ING_앨범_Bang.ver" ),
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039444350259703918/69684ffd4749573d.jpeg", "CHASE_영상통화_팬싸_위드드라마_3차_1", "CHASE_영상통화_팬싸_위드드라마_3차" ),
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039444731748417536/78fc132866859579.jpeg", "데이즈드_포토카드_1", "데이즈드_포토카드" ),
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039445001714798602/d3fc74e018b310b2.jpeg", "CHASE_영상통화_팬싸_애플뮤직_2차_1", "CHASE_영상통화_팬싸_애플뮤직_2차" ),
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039445439277170698/6565546d937e566a.jpeg", "THE_FILM_FESTIVAL_MD_홀더_세트_블랙_1", "THE_FILM_FESTIVAL_MD_홀더_세트_블랙" ), 
 ( 6, "https://cdn.discordapp.com/attachments/1039076920492560445/1039445682496471050/80afc76a7805e372.jpeg", "CHASE_영상통화_팬싸_에버라인_1", "CHASE_영상통화_팬싸_에버라인" ),
 ( 7, "https://cdn.discordapp.com/attachments/1039076920492560445/1039446046343974962/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ),
 ( 7, "https://cdn.discordapp.com/attachments/1039076920492560445/1039446558875320351/de4cd0683277ec81.jpeg", "CHASE_영상통화_팬싸_에버라인_1", "CHASE_영상통화_팬싸_에버라인" ), 
 ( 7, "https://cdn.discordapp.com/attachments/1039076920492560445/1039446771128090634/71fe78e719de4d56.jpeg", "CHASE_영상통화_팬싸_미화당_1", "CHASE_영상통화_팬싸_미화당" );
 INSERT INTO Photocard (artist, path, name, description) VALUES
 ( 7, "https://cdn.discordapp.com/attachments/1039076920492560445/1039447120664612905/837df2eace0e378a.jpeg", "THE_FILM_FESTIVAL_포카_홀더_세트_레드_1", "THE_FILM_FESTIVAL_포카_홀더_세트_레드" ),
 ( 7, "https://cdn.discordapp.com/attachments/1039076920492560445/1039447452039778365/311b8313b5bb4f40.jpeg", "CHASE_영상통화_팬싸_DMC_1차_1", "CHASE_영상통화_팬싸_DMC_1차" ),
 ( 11, "https://cdn.discordapp.com/attachments/1039076920492560445/1039447691547127808/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 11, "https://cdn.discordapp.com/attachments/1039076920492560445/1039447919310413874/REVEAL_ENCORE_EVENT_-_Time_of_CALL.png", "REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카_1", "REVEAL_ENCORE_EVENT: [Time of CALL]_미공개_특전_포카" ),
 ( 11, "https://cdn.discordapp.com/attachments/1039076920492560445/1039449343775756319/919865df0ebbc870.jpeg", "THE_FILM_FESTIVAL_MD _홀더_세트_블랙_1", "THE_FILM_FESTIVAL_MD _홀더_세트_블랙" ), 
 ( 11, "https://cdn.discordapp.com/attachments/1039076920492560445/1039449683053006870/b8cd2436421d8f75.jpeg", "CHASE_영상통화_팬싸_위드드라마_2차_1", "CHASE_영상통화_팬싸_위드드라마_2차" ),
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039450040705499176/MAVERICK_ID_CARD.jpeg", "MAVERICK_앨범_ID_CARD_1", "MAVERICK_앨범_ID_CARD" ), 
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039450384395145276/03bd3bac9b38bf26.jpeg", "CHASE_영상통화_팬싸_에버라인_1", "CHASE_영상통화_팬싸_에버라인" ), 
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039450600397623408/e3ea0843e070b652.jpeg", "CHASE_영상통화_팬싸_미화당_1", "CHASE_영상통화_팬싸_미화당" ),
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039450798096142367/8cfbcc3c6af4e8fc.jpeg", "CHASE_영상통화_팬사_마뮤테_2차_1", "CHASE_영상통화_팬사_마뮤테_2차" ), 
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039451011116433458/f028cb4f4c0605dd.jpeg", "스쿨룩스_스쿨룩스_1", "스쿨룩스_스쿨룩스" ), 
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039451260568485938/c3907f70afc15c65.jpeg", "THE_FILM_FESTIVAL_MD_트레카_1_1", "THE_FILM_FESTIVAL_MD_트레카_1" ),
 ( 16, "https://cdn.discordapp.com/attachments/1039076920492560445/1039451700517404672/22412bec027fd040.jpeg", "DREAMLIKE_앨범_Day.ver_1", "DREAMLIKE_앨범_Day.ver" ),
 
 ( 22, "https://media.discordapp.net/attachments/1039076920492560445/1039443766328688670/Karina-SSGT2022-AppleMusic.jpg?width=364&height=605", "SSGT 2022 _Apple Music_1", "SSGT 2022 _Apple Music" ), 
 ( 22, "https://media.discordapp.net/attachments/1039076920492560445/1039444706393858058/Karina-Savage_POS_Ver-ArClipCard.jpg?width=404&height=606", "Savage P.O.S Ver._Ar Clip Card_1", "Savage P.O.S Ver._Ar Clip Card" ), 
 ( 22, "https://cdn.discordapp.com/attachments/1039076920492560445/1039445649755750471/Karina-Girls-KWANGYA_ver.jpg", "Girls_GYANGYA Ver._1", "Girls_GYANGYA Ver." ), 
 ( 22, "https://cdn.discordapp.com/attachments/1039076920492560445/1039446615204839434/Karina-Savage_POS_Ver-ArPhotocard.jpg", "Savage P.O.S Ver._Ar Photocard_1", "Savage P.O.S Ver._Ar Photocard" ),
 ( 22, "https://media.discordapp.net/attachments/1039076920492560445/1039447037877440522/Karina-Girls_B2S-Thailand.jpg?width=383&height=605", "Girls_B2S Thailand_1", "Girls_B2S Thailand" ), 
 ( 22, "https://cdn.discordapp.com/attachments/1039076920492560445/1039447740188475442/Karina-SMCU-EXPRESS-AR-Ticket-SET0.jpg", "SMCU EXPRESS AR Ticket Set__1", "SMCU EXPRESS AR Ticket Set_" ), 
 ( 22, "https://media.discordapp.net/attachments/1039076920492560445/1039471425272152084/Karina-Girls-Mumo.jpg?width=389&height=606", "Girls_Mumo_1", "Girls_Mumo" ), 
 ( 22, "https://cdn.discordapp.com/attachments/1039076920492560445/1039478545195470878/Karina-SSGT2022-photocard.jpg", "SSGT 2022_photocard_1", "SSGT 2022_photocard" ), 
 ( 23, "https://media.discordapp.net/attachments/1039076920492560445/1039477328671154266/Giselle-savage_p.o.s_ver-ar_clip_cardjpg.jpg?width=404&height=606", "Savage P.O.S Ver_Ar Clip Card_1", "Savage P.O.S Ver_Ar Clip Card" ), 
 ( 23, "https://media.discordapp.net/attachments/1039076920492560445/1039471425473486848/Ningning-GirlsMumo.jpg?width=394&height=606", "Girls_Mumo_1", "Girls_Mumo" ), 
 ( 23, "https://media.discordapp.net/attachments/1039076920492560445/1039472964988567563/Zizel-Girls_Mumo2jpg.jpg?width=386&height=605", "Girls_Mumo2_1", "Girls_Mumo2" ), 
 ( 23, "https://cdn.discordapp.com/attachments/1039076920492560445/1039476556906627102/Giselle-CLIO_2.jpg", "CLIO 2_CLIO 2_1", "CLIO 2_CLIO 2" ), 
 ( 23, "https://media.discordapp.net/attachments/1039076920492560445/1039478544914456586/Giselle-SSGT2022-photocard.jpg?width=391&height=607", "SSGT 2022_Photocard_1", "SSGT 2022_Photocard" ), 
 ( 24, "https://cdn.discordapp.com/attachments/1039076920492560445/1039450056702570559/Winter-savage__Photocard_.jpg", "Savage_SYNK DIVE Ver._1", "Savage_SYNK DIVE Ver." ),
 ( 24, "https://cdn.discordapp.com/attachments/1039076920492560445/1039466708760531044/Winterr-CLIO.jpg", "CLIO_CLIO_1", "CLIO_CLIO" ), 
 ( 24, "https://cdn.discordapp.com/attachments/1039076920492560445/1039468962724974673/Winter-savage_deluxe_box.jpg", "Savage_deluxe box_1", "Savage_deluxe box" ), 
 ( 24, "https://media.discordapp.net/attachments/1039076920492560445/1039471425704185886/Winter-Girls_Mumo_B_ver.jpg?width=391&height=605", "Girls_Mumo B Ver._1", "Girls_Mumo B Ver." ), 
 ( 24, "https://media.discordapp.net/attachments/1039076920492560445/1039472964497846343/Winter-Girls_Mumo_C.jpg?width=390&height=606", "Girls_Mumo C Ver._1", "Girls_Mumo C Ver." ), 
 ( 24, "https://media.discordapp.net/attachments/1039076920492560445/1039478544591507476/Winter-SSGT2022-photocard.jpg?width=390&height=607", "SSGT 2022_photocard_1", "SSGT 2022_photocard" ), 
 ( 25, "https://media.discordapp.net/attachments/1039076920492560445/1039471425985191946/Zizel-Girls_Mumo.jpg?width=385&height=606", "Girls_Mumo_1", "Girls_Mumo" ), 
 ( 25, "https://media.discordapp.net/attachments/1039076920492560445/1039472964804022302/Ningning-GirlsMumo2.jpg?width=393&height=605", "Girs_Mumo2_1", "Girs_Mumo2" ), 
 (25, "https://media.discordapp.net/attachments/1039076920492560445/1039478545514242169/Ningning-SSGT2022-photocard.jpg?width=393&height=606", "SSGT 2022_Photocard_1", "SSGT 2022_Photocard" ),
 ( 33, "https://cdn.discordapp.com/attachments/1039076920492560445/1040164315161956412/3a8be123b22f0cd4.jpeg", "드림쇼_2_5회차_1", "드림쇼_2_5회차" ), 
 ( 28, "https://cdn.discordapp.com/attachments/1039076920492560445/1040164437090369586/313f4dc2cb1e1525.jpeg", "resonance_pt.2_departure_키노_1", "resonance_pt.2_departure_키노" ),
 ( 32, "https://cdn.discordapp.com/attachments/1039076920492560445/1040164876179492934/5aa907513ddad7dc.jpeg", "regulate_앨범_포카_1", "regulate_앨범_포카" ),
 ( 36, "https://cdn.discordapp.com/attachments/1039076920492560445/1040165188638343198/15f8836258d2b200.jpeg", "Universe_SM_STORE_럭키드로우_1", "Universe_SM_STORE_럭키드로우" ),
 ( 29, "https://cdn.discordapp.com/attachments/1039076920492560445/1040166033220173864/5db3310ba5d868db.jpeg", "NEO_CITY_보이스키링_1", "NEO_CITY_보이스키링" ),
 ( 32, "https://cdn.discordapp.com/attachments/1039076920492560445/1041148836552384612/nctdream__.jpg", "Hot_Sauce_앨범_crazyboring_1", "Hot_Sauce_앨범_crazyboring" ),
 ( 33, "https://cdn.discordapp.com/attachments/1039076920492560445/1041149219274227822/nctdream__.jpg", "Hot_Sauce_앨범_crazyboring_1", "Hot_Sauce_앨범_crazyboring" ),
 ( 35, "https://cdn.discordapp.com/attachments/1039076920492560445/1041149672183582800/nctdream.jpg", "Hot_Sauce_앨범_crazyboring_1", "Hot_Sauce_앨범_crazyboring" ),
 ( 33, "https://cdn.discordapp.com/attachments/1039076920492560445/1041150201479565414/nctdream.jpg", "Hot_Sauce_앨범_chillincafe_1", "Hot_Sauce_앨범_chillincafe" ),
 ( 31, "https://cdn.discordapp.com/attachments/1039076920492560445/1041150919351488595/nctdream.jpg", "Hot_Sauce_앨범_crazyboring_1", "Hot_Sauce_앨범_crazyboring" ), 
 ( 31, "https://cdn.discordapp.com/attachments/1039076920492560445/1041151304082403488/nctdream.jpg", "Hot_Sauce_앨범_chillincafe_1", "Hot_Sauce_앨범_chillincafe" ), 
 ( 37, "https://cdn.discordapp.com/attachments/1039076920492560445/1041152769177952326/nctRESONANCE.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 31, "https://cdn.discordapp.com/attachments/1039076920492560445/1041153012233670697/nctpt1.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 32, "https://cdn.discordapp.com/attachments/1039076920492560445/1041153197345079356/nctpt1.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 38, "https://cdn.discordapp.com/attachments/1039076920492560445/1041153369143791697/nctpt1.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 35, "https://cdn.discordapp.com/attachments/1039076920492560445/1041153536601358356/nctpt1.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 30, "https://cdn.discordapp.com/attachments/1039076920492560445/1041153732391473193/nctpt1.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 36, "https://cdn.discordapp.com/attachments/1039076920492560445/1041153990622183484/nctpt1.jpg", "resonance_pt.1_포카_1", "resonance_pt.1_포카" ), 
 ( 34, "https://cdn.discordapp.com/attachments/1039076920492560445/1041154337377878086/nctpt2.jpg", "resonance_pt.2_Arrival_키노_1", "resonance_pt.2_Arrival_키노" ), 
 ( 36, "https://cdn.discordapp.com/attachments/1039076920492560445/1041154602961207367/nctpt2.jpg", "resonance_pt.2_Arrival_키노_1", "resonance_pt.2_Arrival_키노" ), 
 ( 31, "https://cdn.discordapp.com/attachments/1039076920492560445/1041154864429928499/nctpt2.jpg", "resonance_pt.2_Arrival_키노_1", "resonance_pt.2_Arrival_키노" ), 
 ( 32, "https://cdn.discordapp.com/attachments/1039076920492560445/1041155082475032677/nctpt2.jpg", "resonance_pt.2_Arrival_키노_1", "resonance_pt.2_Arrival_키노" ), 
 ( 29, "https://cdn.discordapp.com/attachments/1039076920492560445/1041155375514263592/nct.jpg", "resonance_pt.2_Arrival_키노_1", "resonance_pt.2_Arrival_키노" ),
 ( 29, "https://cdn.discordapp.com/attachments/1039076920492560445/1041155579575541870/nctdepar.jpg", "resonance_pt.2_departure_키노_1", "resonance_pt.2_departure_키노" ), 
 ( 33, "https://cdn.discordapp.com/attachments/1039076920492560445/1041156059542335608/nctarri.jpg", "resonance_pt.2_Arrival_키노_1", "resonance_pt.2_Arrival_키노" ), 
 ( 36, "https://cdn.discordapp.com/attachments/1039076920492560445/1041156381086064640/nctpt.jpg", "resonance_pt.2_departure_키노_1", "resonance_pt.2_departure_키노" );
-- desc TradeStatusCategory;

INSERT INTO TradeStatusCategory (id, name) VALUES
(1,'판매중'),
(2,'판매완료');

-- desc PhotocardSellArticle;
-- INSERT INTO PhotocardSellArticle (photocard, user, title, price, viewCount, description, tradeStatus)
-- VALUES ();
