
const Image = (props:any) => {
  const apiUrl= process.env.NEXT_PUBLIC_STAGING_LINK;
  return (
    <img src={apiUrl+props.src} alt={props.alt} className={props.className}  onClick={props.onClick ? props.onClick : undefined}/>
  )
}

export default Image
