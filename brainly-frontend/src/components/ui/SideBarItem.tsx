import React, { ReactElement } from 'react'

interface SideBarItemProps {
 text: string,
 icon: ReactElement 
}

const SideBarItem = (props: SideBarItemProps): ReactElement => {
  return (
    <div className='flex text-gray-700 py-2 px-2 hover:bg-gray-100 rounded cursor-pointer'>
        <div className='pr-2'>{props.icon}</div>
        <div>{props.text}</div>
    </div>
  )
}

export default SideBarItem