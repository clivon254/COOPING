
import React, { useState, useRef, useEffect } from 'react';
import { Pizza, ShoppingCart, Gift, Car, Coffee, Package, Heart, Store, Search, User, Menu } from 'lucide-react';
import { IoHomeOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom';



export default function(){

  const [rotation, setRotation] = useState(0);

  const [isDragging, setIsDragging] = useState(false);

  const [startAngle, setStartAngle] = useState(0);

  const navigate = useNavigate()

  const containerRef = useRef(null);

  // Auto rotate effect
  useEffect(() => {
    const autoRotateInterval = setInterval(() => {
      if (!isDragging) {
        setRotation(prev => (prev + 0.2) % 360);
      }
    }, 50);
    
    return () => clearInterval(autoRotateInterval);
  }, [isDragging]);

  // Number of icons in the circle
  const iconCount = 8;
  
  // Icon components to use in the circle
  const icons = [
    { component: ShoppingCart, name: "Groceries" ,link:"/food"},
    { component: Gift, name: "Gifts" ,link:"/groceries" },
    { component: Car, name: "Express" ,link:"/liqour"},
    { component: Coffee, name: "Coffee" ,link:"/groceries"},
    { component: Package, name: "Anything" ,link:"/drink"},
    { component: Heart, name: "Essentials" ,link:"/groceries"},
    { component: Store, name: "Retail" ,link:"/merchendise"},
    { component: Pizza, name: "Takeaway" ,link:"/groceries"}
  ];

  const [activeCategory, setActiveCategory] = useState(icons[0]);

  // Calculate position for each icon based on current rotation
  const getIconPosition = (index) => {
    const angle = ((index * (360 / iconCount)) + rotation) * (Math.PI / 180);
    const radius = 120; // Distance from center
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y, angle: ((index * (360 / iconCount)) + rotation) % 360 };
  };

  // Handle mouse/touch interactions for rotation
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Get clientX and clientY depending on event type
    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    setStartAngle(angle - rotation);
  };

  const handleMouseMove = (e) => {

    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;
    
    // Get clientX and clientY depending on event type
    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;

    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);

    setRotation(angle - startAngle);

  };

  const handleMouseUp = () => {

    setIsDragging(false);

  };

  const handleIconClick = (name) => {

    setActiveCategory(name);

  };

  return (

    <div className="w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-4">
      
      <div className="container mx-auto px-4">
        
          {/* Main banner content */}
          <div className="flex flex-col md:flex-row items-center">
         
          {/* Left text content */}
          <div className="w-full md:w-1/2 text-white mb-8 md:mb-0 text-center md:text-left">

            <h1 className="text-4xl font-bold mb-4">Hungry? We've got you covered!</h1>

            <p className="text-lg mb-6">Delivery in under 30 minutes for all your favorites</p>

            <p className="text-xl font-bold mb-2">Currently browsing: {activeCategory.name}</p>

            <button 
                className="bg-white text-yellow-500 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                onClick={() => navigate(`${activeCategory?.link}`)}
            >
              Order Now
            </button>

          </div>
          
          {/* Right rotating menu */}
          <div 
            ref={containerRef}
            className="relative w-full md:w-1/2 h-72 flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >

            {/* Background circle for visual reference */}
            <div className="absolute w-64 h-64 rounded-full  border-white bg-white bg-opacity-10" />
            
            {/* Central food icon */}
            <div 
              className="absolute flex flex-col items-center justify-center z-10 bg-primary/60 rounded-full w-24 h-24 shadow-lg cursor-pointer hover:bg-yellow-600 transition-colors"
            >

              <IoHomeOutline className="text-white" size={32}/>

              <div className="text-white font-semibold mt-1">Food</div>

            </div>
            
            {/* Surrounding icons */}
            {icons.map((icon, index) => {

              const { x, y, angle } = getIconPosition(index);

              const Icon = icon.component;
              
              // Calculate size based on position (icons in front are larger)
              const isInFront = angle > 270 || angle < 90;

              const scale = isInFront ? 1 : 0.8;

              const opacity = isInFront ? 1 : 0.8;
              
              return (

                <div 
                  key={index}
                  className="absolute flex flex-col items-center justify-center bg-white rounded-full shadow-md transition-all duration-100 ease-out cursor-pointer hover:bg-gray-100 text-xs p-2"
                  style={{ 
                    transform: `translate(${x}px, ${y}px) scale(${scale})`,
                    opacity,
                    width: "70px",
                    height: "70px",
                    zIndex: isInFront ? 5 : 1
                  }}
                  onClick={() => handleIconClick(icon)}
                >

                  <Icon size={24} className="text-gray-600" />

                  <div className="text-xs mt-1 text-gray-700">{icon.name}</div>

                </div>

              );

            })}
            
          </div>

        </div>

      </div>

    </div>

  );
};

