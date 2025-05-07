import { useState } from 'react';
import { GradientBtn, RTE } from '@components';
import { useEffect, useRef } from 'react';
import { Ireadmore } from '@interfaces';
import styles from './readMoreContent.module.scss';

const ReadMoreContent = (props: Ireadmore) => {
  const { description, maxLines, className } = props;
  const [isMore, setIsMore] = useState(false);
  const divRef = useRef<any>(null);
  const [show, setShow] = useState<boolean>(true);

  const calculateLines = (ref: React.RefObject<HTMLDivElement>): number => {
    if (!ref.current) return 0;

    const div = ref.current;

    // Get the computed line height of the text
    const lineHeight = parseFloat(getComputedStyle(div).lineHeight);
    const divHeight = div.clientHeight;

    // Calculate the number of lines
    return Math.floor(divHeight / lineHeight);
  };

  const handleLoadMore = () => {
    setIsMore(false);
  };

  const handleLoadLess = () => {
    setIsMore(true);
  };

  useEffect(() => {
    // Initial line count calculation
    if (divRef.current) {
      const lines = calculateLines(divRef);
      if (lines <= maxLines) {
        setShow(false);
        setShow(false);
      } else {
        setShow(true);
        setIsMore(true);
      }
    }

  }, []);

  return (
    <>
      <div>
        {description && (
          <div
            ref={divRef}
            className={`${className} ${styles.lineClamp} mb-4`}
            style={{ WebkitLineClamp: isMore ? maxLines : 'none' }}
          >
            {<RTE compData={description}/>}
          </div>
        )}

        {show &&
          (isMore ? (
            <GradientBtn text={'Read More'} middle={false} onClick={handleLoadMore} />
          ) : (
            <GradientBtn text={'Read Less'} middle={false} onClick={handleLoadLess} />
          ))}
      </div>
    </>
  );
};

export default ReadMoreContent;
