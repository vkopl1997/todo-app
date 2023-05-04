import React, { useState, useEffect } from 'react';
import './navbarStyles.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if(!isMenuClicked) {
        setBurgerClass("burger-bar clicked")
        setMenuClass("menu visible")
    }
    else {
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
}

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/');
  };
  const personName = localStorage.getItem('name');
  const [personPhoto, setPersonPhoto] = useState(localStorage.getItem('photo'));

  useEffect(() => {
    const personPhoto = localStorage.getItem('photo');
    setPersonPhoto(personPhoto);
  }, []);

  const validImageFormats = /\.(jpeg|jpg|gif|png)$/i;

  let imageUrl;
  if (personPhoto) {
    if (personPhoto.startsWith('data:image')) {
      const byteString = atob(personPhoto.split(',')[1]);
      const mimeString = personPhoto.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([uintArray], { type: mimeString });
      imageUrl = URL.createObjectURL(blob);
    } else if (validImageFormats.test(personPhoto)) {
      imageUrl = personPhoto;
    }
  }

  return (
    <>
      <div className='navbar-main'>
        <div className='title'>TO DO</div>
        <div className='person-info'>
              <div>{personName}</div>
              {imageUrl && <img className='person-img' src={imageUrl} alt='person'style={{ backgroundPosition: 'center',backgroundSize:'cover' }}/>}
              <button className='logout' onClick={logOut}>log out</button>
        </div>
        <div className='burger-menu' onClick={updateMenu}>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
                <div className={burger_class} ></div>
          </div>
          <div className={menu_class}>
            <div className='burger-wrapper'>
              <div className='burger-menu burgermenu-open' onClick={updateMenu}>
                  <div className={burger_class} ></div>
                  <div className={burger_class} ></div>
                  <div className={burger_class} ></div>
              </div>
              <div className='white-wrapper'>
                {imageUrl && <img className='person-img burger-img' src={imageUrl} alt='person'style={{ backgroundPosition: 'center',backgroundSize:'cover' }}/>}
                <div className='burger-name'>{personName}</div>
                <button className='logout' onClick={logOut}>log out</button>
              </div>
            

            </div>
          </div>
        </div>
      
    </>
    
  );
};