import picture from './images/title-left-icon.png'
import style from './index.pcss'

export default _ => {
  return (
    <div className={style.init}>
      hello word <img src={picture} alt="" /> <i className={style.img} />
    </div>
  )
}
