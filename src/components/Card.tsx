interface CardProps {
  title: string;
  onClick: () => void;
  isLink?: boolean;
}

const Card: React.FC<CardProps> = ({ title, onClick, isLink = false }) => {
  return (
    <div
      className={`${
        isLink ? "w-full max-w-3xl p-2" : "w-48 p-4"
      } bg-dracula-current border border-dracula-foreground rounded-lg shadow-lg m-2 cursor-pointer flex items-center justify-center hover:bg-dracula-purple transition-colors duration-200`}
      onClick={onClick}
    >
      <h3 className="text-xs font-bold truncate">{title}</h3>
    </div>
  );
};

export default Card;
