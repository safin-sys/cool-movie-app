import React from 'react';
import john from "../img/john.jpg";

function Account() {
    return (
        <div className="account">
            <div className="nav-bg"></div>
            <div className="account-container">
                <aside>
                <div className="user-info">
                        <div className="avatar">
                            <img src={john} alt="avatar"/>
                        </div>
                        <p className="name">John Doe</p>
                        <p className="mail">john@doe.com</p>
                    </div>
                    <div className="user-control">
                        <h5>Delete Account</h5>
                        <h5>Logout</h5>
                    </div>
                </aside>
                <main>
                    <h1>MAIN</h1>
                </main>
            </div>
        </div>
    )
}

export default Account;