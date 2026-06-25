import styles from './Card.module.css';

const Card = ({ title, content, imageUrl }) => {
  return (
    <div className={styles.container}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default Card;