/**
 * Web implementation, using an <input type="time">
 * @param props value, onChange, minuteInterval
 * @constructor
 */
function TimeSelector(props){

  return (
    <input
      type="time"
      value={props.value}
      onChange={e=>props.onChange(e, e.target.value)}
      step={(props.minuteInterval*60)??60}
    />
  );
}

export default TimeSelector;
