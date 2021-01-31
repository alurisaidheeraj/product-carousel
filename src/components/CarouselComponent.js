import React from "react";
import "./CarouselComponent.scss";
const item = [
  {
    desc: "Test1"
  },
  {
    desc: "Test2"
  },
  {
    desc: "Test3"
  },
  {
    desc: "Test4"
  },
  {
    desc: "Test5"
  },
  {
    desc: "Test6"
  },
  {
    desc: "Test7"
  },
  {
    desc: "Test8"
  },
  {
    desc: "Test9"
  },
  {
    desc: "Test10"
  }
];
class CarouselCustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.slider = React.createRef();
    // this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      isDown: false,
      startX: 0,
      scrollLeft: 1,
      width: 0,
      slicks: null,
      WindowInnerWidth: window.innerWidth,
      eachItemWith: window.innerWidth < 500 ? 200 : 400
    };
  }

  componentDidMount() {
    const { eachItemWith } = this.state;
    this.slider.current.addEventListener("mousedown", this.mousedownEvt);
    this.slider.current.addEventListener("touchstart", this.touchstart);
    this.slider.current.addEventListener("mouseleave", this.mouseLeaveEvt);
    this.slider.current.addEventListener("touchcancel", this.mouseLeaveEvt);
    this.slider.current.addEventListener("mouseup", this.mouseUp);
    this.slider.current.addEventListener("touchend", this.mouseUp);
    this.slider.current.addEventListener("mousemove", this.mouseMove);
    this.slider.current.addEventListener("touchmove", this.touchMove);
    console.log(
      "componentDidUpdate",
      this.slider.current.getBoundingClientRect()
    );
    window.addEventListener("resize", this.resize);

    const totalWidth = item.length * eachItemWith + item.length * 20;
    const width = this.slider.current.getBoundingClientRect().width;
    const splitLayers = Math.round(totalWidth / width);

    const newSlicks = [];
    for (let i = 0; i < splitLayers; i++) {
      if (i + 1 === splitLayers) {
        newSlicks.push({ item: i, start: i * width, end: totalWidth });
      } else if (i === 0) {
        newSlicks.push({ item: i, start: -0.1, end: (i + 1) * width });
      } else {
        newSlicks.push({ item: i, start: i * width, end: (i + 1) * width });
      }
    }

    this.setState({
      width,
      slicks: newSlicks,
      totalWidth
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.WindowInnerWidth !== this.state.WindowInnerWidth) {
      const eachItemWith = this.state.WindowInnerWidth < 500 ? 200 : 400;
      const totalWidth = item.length * eachItemWith + item.length * 20;
      const width = this.slider.current.getBoundingClientRect().width;
      const splitLayers = Math.round(totalWidth / width);

      const newSlicks = [];
      for (let i = 0; i < splitLayers; i++) {
        if (i + 1 === splitLayers) {
          newSlicks.push({ item: i, start: i * width, end: totalWidth });
        } else if (i === 0) {
          newSlicks.push({ item: i, start: -0.1, end: (i + 1) * width });
        } else {
          newSlicks.push({ item: i, start: i * width, end: (i + 1) * width });
        }
      }
      this.slider.current.scrollLeft = 1;
      this.setState({
        width,
        slicks: newSlicks,
        scrollLeft: 1
      });
    }
    // console.log("scrollLeft",this.slider.current && this.slider.current.getBoundingClientRect())
  }

  mousedownEvt = (e) => {
    console.log("ontouchstart :");
    this.setState({
      isDown: true
    });
    // this.slider.current.classList.add('active');
    this.setState({
      startX: e.pageX - this.slider.current.offsetLeft,
      scrollLeft: this.slider.current.scrollLeft
    });
    // startX = e.pageX - slider.offsetLeft;
    // scrollLeft = slider.scrollLeft;
  };

  touchstart = (e) => {
    console.log("ontouchstart :");
    this.setState({
      isDown: true
    });
    // this.slider.current.classList.add('active');
    this.setState({
      startX: e.changedTouches[0].screenX - this.slider.current.offsetLeft,
      scrollLeft: this.slider.current.scrollLeft
    });
    // startX = e.pageX - slider.offsetLeft;
    // scrollLeft = slider.scrollLeft;
  };
  mouseLeaveEvt = () => {
    console.log("ontouchstart :");
    this.setState({
      isDown: false
    });
    // this.slider.current.classList.remove('active');
  };

  mouseUp = () => {
    console.log("ontouchstart :");
    this.setState({
      isDown: false
    });
    // this.slider.current.classList.remove('active');
  };

  mouseMove = (e) => {
    console.log("ontouchmove :");
    console.log(
      "scrollLeft",
      this.slider.current && this.slider.current.offsetWidth
    );
    if (!this.state.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.slider.current.offsetLeft;
    // console.log('x :', x);
    const walk = (x - this.state.startX) * 3; //scroll-fast
    // console.log('walk :', walk);
    this.slider.current.scrollLeft = this.state.scrollLeft - walk;
    this.setState({
      startX: e.pageX - this.slider.current.offsetLeft,
      scrollLeft: this.slider.current.scrollLeft
    });
    console.log(walk);
  };

  touchMove = (e) => {
    console.log("e.changedTouches :", e.changedTouches);
    if (!this.state.isDown) return;
    e.preventDefault();
    const x = e.changedTouches[0].screenX - this.slider.current.offsetLeft;
    // console.log('x :', x);
    const walk = (x - this.state.startX) * 3; //scroll-fast
    // console.log('walk :', walk);
    this.slider.current.scrollLeft = this.state.scrollLeft - walk;
    this.setState({
      startX: e.changedTouches[0].screenX - this.slider.current.offsetLeft,
      scrollLeft: this.slider.current.scrollLeft
    });
    console.log(walk);
  };

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // Are we adding new items to the list?
  //   // Capture the scroll position so we can adjust scroll later.
  //   // console.log("window.innerHeight()",this.state.WindowInnerWidth)
  //   // console.log("scrollLeft",this.slider.current && this.slider.current.getBoundingClientRect())
  // }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.setState({
      WindowInnerWidth: window.innerWidth
    });
  };

  scrollRight = () => {
    const { width, scrollLeft, totalWidth } = this.state;
    const currentWidth = width + scrollLeft;
    debugger;
    if (currentWidth >= totalWidth) {
      this.slider.current.scrollLeft = totalWidth;
      this.setState({
        scrollLeft: totalWidth
      });
    } else {
      this.slider.current.scrollLeft = currentWidth;
      this.setState({
        scrollLeft: currentWidth
      });
    }
  };
  scrollLeft = () => {
    const { width, scrollLeft } = this.state;
    const currentWidth = scrollLeft - width;
    if (currentWidth <= 0) {
      this.slider.current.scrollLeft = 1;
      this.setState({
        scrollLeft: 1
      });
    } else {
      this.slider.current.scrollLeft = currentWidth;
      this.setState({
        scrollLeft: currentWidth
      });
    }
  };

  gotoSlider = (i) => {
    const { width } = this.state;
    const currentWidth = width * i;
    debugger;
    this.slider.current.scrollLeft = currentWidth;
    this.setState({
      scrollLeft: currentWidth
    });
  };

  render() {
    console.log("slicks", this.state.slicks);

    return (
      <div className="container">
        <header onClick={this.scrollLeft} className="slider-left">
        <button className="slider-left-icon">{"<"}</button>
        </header>
        <div className="items" ref={this.slider}>
          {item.map((r, i) => (
            <div key={r.desc} className="item item1">
              {r.desc}
            </div>
          ))}
        </div>
        <ul className="slicks">
          {(this.state.slicks || []).map((r, i) => {
            const enable =
              this.state.scrollLeft > r.start && this.state.scrollLeft <= r.end;
            return (
              <li>
                <button
                  onClick={() => this.gotoSlider(i + 1)}
                  className={enable ? "active" : ""}
                  type="button"
                  data-role="none"
                  tabindex="0"
                >
                  1
                </button>
              </li>
            );
          })}
        </ul>
        <footer className="slider-right" onClick={this.scrollRight}>
        <button className="slider-right-icon">{">"}</button>
        </footer>
      </div>
    );
  }
}

export default CarouselCustomTextInput;
