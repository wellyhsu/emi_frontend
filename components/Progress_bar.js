class Index extends Component {
    render() {
      return (
        <div className = "circleBox" >
         <svg id="svg" width="500" height="500" viewPort="250 250 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle id="circle" r= "90" cx="250" cy="250" fill="transparent" strokeDasharray={2 * 90 * Math.PI} strokeDashoffset="0" />
            <circle id="bar" r="90" cx="250" cy="250" fill="transparent" strokeDasharray={2 * 90 * Math.PI}  strokeDashoffset="100" transform="rotate(-90, 250, 250)"
            />
          </svg>
        </div>
      );
    }
}