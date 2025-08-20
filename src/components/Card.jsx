function Card({ children }){
    return (
        <div className="p-4 bg-white shadow-lg rounded-2xl">
            {children}
        </div>
    );
}

export default Card;