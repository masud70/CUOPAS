import React from 'react';
import "./MidComponent.css";

const MidComponent = () => {
    return (
        <div className="d-flex justfy-content-around">
            <div className="col-4">
                <div className="div attendanceDiv">
                    <h4 className="">Attendance</h4>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus veniam enim aut ex praesentium labore doloribus est quos eum! Corporis soluta dolor ratione? Totam placeat exercitationem harum excepturi dignissimos blanditiis laudantium repellendus ut, a animi? Necessitatibus ipsa vitae consequatur pariatur rem maiores deleniti harum odit nam! Iusto enim sint cum.
                    </p>
                    <br/>
                    <div className="col-12 arrowRight">
                        <i class="far fa-arrow-alt-circle-right"></i>
                    </div>
                   
                </div>
            </div>
            <div className="col-4">
                <div className="div paymentDiv">
                    <h4 className="">Payment</h4>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam ea, a, libero ipsa voluptates quisquam esse dolorum dicta quis recusandae obcaecati perspiciatis ducimus voluptatibus sapiente sint cupiditate iusto? Tempore, recusandae aliquid voluptatum optio esse repellat sequi id ut eos, nemo quam quia. Accusantium hic corporis dignissimos illum mollitia adipisci officiis.
                    </p><br/>
                    <div className="col-12 arrowRight">
                        <i class="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="div othersDiv">
                    <h4 className="">Others</h4>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus veniam enim aut ex praesentium labore doloribus est quos eum! Corporis soluta dolor ratione? Totam placeat exercitationem harum excepturi dignissimos blanditiis laudantium repellendus ut, a animi? Necessitatibus ipsa vitae consequatur pariatur rem maiores deleniti harum odit nam! Iusto enim sint cum.
                    </p>
                    <div className="col-12 arrowRight">
                        <i class="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MidComponent;