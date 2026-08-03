import "./ProfileModal.css";


interface Props {

    user:any;

    onClose:()=>void;

}


export default function ProfileModal({

    user,

    onClose

}:Props){


    return (

        <div className="modal-overlay">


            <div className="profile-modal">


                <h2>
                    Profile
                </h2>


                <div className="profile-item">

                    <label>
                        Name
                    </label>

                    <p>
                        {user?.name}
                    </p>

                </div>



                <div className="profile-item">

                    <label>
                        Email
                    </label>

                    <p>
                        {user?.email}
                    </p>

                </div>



                <button
                    onClick={onClose}
                >

                    Close

                </button>


            </div>


        </div>

    );

}