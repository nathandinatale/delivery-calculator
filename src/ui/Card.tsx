import classes from "./Card.module.css";
//** Card is a simple wrapper component used for styling, easily extensible */
const Card: React.FC<{}> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
