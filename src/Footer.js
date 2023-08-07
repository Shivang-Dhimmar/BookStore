
import classes from './Register.module.css';
import logo from './assets/images/site-logo.svg';

function Footer(){
    return(
        <div>
            <footer className={classes.footerWrapper}>
                <div className='logo-container'>
                    <img className={classes.footerlogo} src={logo} alt='site logo'/>
                </div>
                <div className='copyright-container'>
                    <p className='copyright-text'>
                        © 2015 Tatvasoft.com. All rights reserved.
                    </p>
                </div>

            </footer>
        </div>
    );
}
export {Footer};