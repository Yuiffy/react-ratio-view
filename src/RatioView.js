import React, { useEffect, useRef, useState } from "react";
import { css, cx } from 'emotion';
import { useWindowSize } from "react-use";

const styles = {
  ratioAspectView: () => cx('ratio-aspect-view', css`
    width: 100%;
    height: 100%;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .ratio-aspect-view{
      &__inner{
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
       }
       &__width-fit{
        width: 100%;
        height: 0;
        position: relative;
        &__inner{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
       }
    }
  `)
};

export default function RatioView(props) {
  const {
    className, ratio = 1, ...others
  } = props;
  const {
    calculateWidth = (options) => {
      const { clientHeight, ratio } = options || {};
      return clientHeight * ratio;
    }
  } = props;

  // 在高度窄的时候自动限制宽度，使高度不会超出
  const containerRef = useRef(null);
  let { height: windowHeight } = useWindowSize();
  const [componentWidth, setComponentWidth] = useState(null);
  useEffect(() => {
    if (containerRef && windowHeight > 0) {
      const { clientHeight, clientWidth } = (containerRef.current) || {};
      const needWidth = calculateWidth({ clientHeight, ratio, ...others });
      // console.log("RatioView calculator:", clientHeight, clientWidth, needWidth);
      if (needWidth < clientWidth) {
        // console.log("needWidth < clientWidth", needWidth, clientWidth);
        setComponentWidth(needWidth);
      }else{
        setComponentWidth(null);
      }
    }
  }, [calculateWidth, containerRef, others, ratio, windowHeight])


  return <div className={cx(styles.ratioAspectView(), className, css``)} ref={containerRef}>
    <div className={cx('ratio-aspect-view__inner', css`
       ${componentWidth ? `width: ${componentWidth}px` : 'flex: 1'}
    `)}>
      <div className={cx('ratio-aspect-view__width-fit', css`padding-top: ${100.0 / ratio}%`)}>
        <div className="ratio-aspect-view__width-fit__inner">
          {props.children}
        </div>
      </div>
    </div>
  </div>
}
