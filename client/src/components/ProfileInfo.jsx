import React from 'react'

const ProfileInfo = ({onLogout}) => {

  return (
    <div>
        <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default ProfileInfo