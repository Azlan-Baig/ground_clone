'use client'

import dynamic from 'next/dynamic'
// import CountUp from 'react-countup';
const CountUp = dynamic(
  () => import('react-countup'),
  { ssr: false }
)
type IProps = {
  value: string;
  className?: string;
}
const CountAnim = (props:IProps) => {
  const {value : fomatValue, className=''} = props;
  const value = fomatValue.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // This regex captures optional +/-, numbers (with optional decimals), and optional K/M suffix
  // const match = value.match(/^([+-]?[\d,.]+)([a-zA-Z]+)$/);
  const match = value.match(/^([+-]?[\d,.]+)([a-zA-Z%]+)?$/);


  if (!match) {
    return 'Invalid metrics format';
  }

  const [, numericValue, suffix] = match;

  // Convert the numeric value to a float for accurate CountUp calculations
  const endValue = parseFloat(numericValue.replace(/,/g, ''));
  const decimals = numericValue.includes('.') ? numericValue.split('.')[1].length : 0;
  
  return (
    <>
      {value && 
      <CountUp
        start={0}
        end={endValue} // Use the numeric value directly
        duration={2.5} // Adjust duration as needed
        separator=","
        decimals={decimals}
        prefix={value.startsWith('+') ? '+' : ''} // Handle + sign for prefix
        suffix={suffix}
        className={`${className}`}
        enableScrollSpy
        scrollSpyOnce
      >{({ countUpRef }) => <span ref={countUpRef} />}</CountUp>}
    </>
  );
};

export default CountAnim;