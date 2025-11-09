import { useEffect, useState } from 'react'
import "../../../index.css"
import "./HightLights.css"
import TextAnimation from '../../txtAni/TextAnimation';
import { MENUICON } from '../../../assets/iconsvg/iconList';


function Profile({ profileData, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (!profileData) return null; 

  return (
    <>
    <div className="profileDetailView-container" onClick={onClose}>
      <div className="profile-content" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="profileView-header">
          <TextAnimation align='left' />
          <button className="close-box" onClick={onClose}>
            <img src={MENUICON['cross']} alt="close" />
          </button>
        </div>

        <div className="first-section">

          {/* DESCRIPTION */}
          <div className="profileDescription">
            <h1>Hi,</h1>
            <p>{profileData.aboutText}</p>
            <div className="socialLinks">
              <a href="#"><img src="#" alt="github" /></a>
              <a href="#"><img src="#" alt="facebook" /></a>
              <a href="#"><img src="#" alt="instagram" /></a>
              <a href="#"><img src="#" alt="threads" /></a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="profileImgBox">
            <div className="profileImage">
              {profileData.profileImg ? (
                <img src={profileData.profileImg} alt={"profile image"} />
              ) : (
                <p>Empty Image</p>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="profileContainer">
          <div className="generalDetails">
            <div className="knowledgeDetails">
              <h2>Languages</h2>
            </div>
          </div>
          <div className="skillDetails">
            <div className="skillDetailsGrid">
              <h2>Software & Tools</h2>
            </div>
          </div>
          <div className="activityDetails">
            <div className="activityDetailsGrid">
              <h2>Activities</h2>
            </div>
          </div>
        </div>
        <div className="profileView-footer"></div>
      </div>
    </div>
  </>
  )
}

export default Profile