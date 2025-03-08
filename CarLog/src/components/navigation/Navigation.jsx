import { useContext } from 'react';
import { Link } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function Navigation(){
    const { auth } = useContext(AuthContext);  
    console.log('navigation');
    
    console.log(auth);
    
      
    return (
        <div className="top-area">
        <div className="header-area">
           
            <nav className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"  data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">

                <div className="container">

                    
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                            <i className="fa fa-bars"></i>
                        </button>
                        <Link className="navbar-brand" to="/">carlog<span></span></Link>

                    </div>
                  

                    
                    <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                        <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                            <li className=" scroll"><Link to="/">home</Link></li>
                            <li className="scroll"><Link to="/cars">cars</Link></li>
                            <li className="scroll"><Link to="/contacts">contacts</Link></li>
                            {auth.email && (<li className="scroll"><Link to="/auth/profile">profile</Link></li>)}
                            {!auth.email && (<li className="scroll"><Link to="/auth/login">login</Link></li>)}
                            {!auth.email && (<li className="scroll"><Link to="/auth/register">register</Link></li>)}
                            {auth.email && (<li className="scroll"><Link to="/auth/logout">logout</Link></li>)}
                            {/* {isAuthenticated && (<li className="scroll"><Link to="/auth/profile">profile</Link></li>)}
                            {!isAuthenticated && (<li className="scroll"><Link to="/auth/login">login</Link></li>)}
                            {!isAuthenticated && (<li className="scroll"><Link to="/auth/register">register</Link></li>)}
                            {isAuthenticated && (<li className="scroll"><Link to="/auth/logout">logout</Link></li>)} */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div className="clearfix"></div>

    </div>

    )
}