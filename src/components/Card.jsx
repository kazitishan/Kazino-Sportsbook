function Card({ children }){
    return (
        <div className="flex flex-col mb-4 p-6 bg-white shadow-lg hover:shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
            {children}
        </div>
    );
}

export default Card;