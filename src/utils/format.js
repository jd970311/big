import { dayjs } from 'element-plus'
export const formatDate = (time) => {
  return dayjs(time).format('YYYY-MM-DD')
}
