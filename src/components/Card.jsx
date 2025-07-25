function Card({ children }){
    return (
        <div className="p-4 bg-white shadow-lg hover:shadow-xl rounded-2xl transition-all duration-300 hover:scale-[1.02]">
            {children}
        </div>
    );
}

export default Card;