import { Box, Divider } from "@mui/material";

const Footer = () => {

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      lineHeight: 1.5,
      fontSize: '13px',
      margin: '2px 0',
      color:'#ddd'
    }}>
      <Divider />
      <span>버블펫 대표: 엄관호</span>
      <span>경기도 고양시 일산동구 정발산로24, 2층 A-263호(장항동, 웨스턴돔1)</span>
      <span>사업자등록번호: 333-04-02814</span>
      <span>대표 이메일 : unilov@hanmail.net</span>
      <span>대표 번호 : 070-8657-2853</span>
    </Box>
  )
}
export default Footer;