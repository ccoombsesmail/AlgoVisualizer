import React from 'react';

const BarNode = (props) => {

    return <div id={props.idName} style={{ height: props.height, width: props.width, backgroundColor: props.backgroundColor, marginLeft: "2px", float: "left"  }}/>

};



export default BarNode;