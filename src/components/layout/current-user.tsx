import { Popover } from "antd"

const CurrentUser = () => {
  return (
    <div>
        <Popover
            placement="bottomRight"
            trigger="click"
            overlayInnerStyle={{padding:0}}
            overlayStyle={{zIndex:999}}
        >
            Test
        </Popover>
    </div>
  )
}

export default CurrentUser