import React from 'react';

const BarNode = (props) => {

    return <div id={props.idName} style={{ height: props.height, width: props.width, background: props.backgroundColor, marginLeft: "1px", float: "left", boxShadow: "2px 4px  #888888"  }}/>

};



export default BarNode;