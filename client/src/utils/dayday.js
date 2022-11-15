import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getTimeDiff = (timeToCompare) => {
  const timeDiffDuration = dayjs.duration(dayjs().diff(timeToCompare));
  const yearDiff = parseInt(timeDiffDuration.format('Y'));
  const monthDiff = parseInt(timeDiffDuration.format('M'));
  const dateDiff = parseInt(timeDiffDuration.format('D'));
  const hourDiff = parseInt(timeDiffDuration.format('H'));
  const minuteDiff = parseInt(timeDiffDuration.format('m'));
  const secondDiff = parseInt(timeDiffDuration.format('s'));

  return yearDiff > 0
    ? `${yearDiff}년 전`
    : monthDiff > 0
    ? `${monthDiff}달 전`
    : dateDiff > 0
    ? `${dateDiff}일 전`
    : hourDiff > 0
    ? `${hourDiff}시간 전`
    : minuteDiff > 0
    ? `${minuteDiff}분 전`
    : secondDiff > 0
    ? `${secondDiff}초 전`
    : '';
};
