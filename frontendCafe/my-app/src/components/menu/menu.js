import { useNavigate } from 'react-router-dom';
import drinkBg from '../../assets/images/drinkMenuImage.jpg';
import foodBg from '../../assets/images/foodMenuImage.jpg';
import './menu.css';

const MenuSection = () => {
  const navigate = useNavigate();

  return (
    <section id="menu" className="menu-section">
      <h2 className="menu-section-title">Our Menu</h2>
      <div className="menu-hero-cards">
        <div
          className="menu-hero-card bar-menu"
          style={{ backgroundImage: `url(${drinkBg})` }}
        >
          <h3>Drink Menu</h3>
          <p>Wines, coffees, and refreshing drinks</p>
          <button type="button" onClick={() => navigate('/menu/drinks')}>
            View Our Drinks
          </button>
        </div>
        <div
          className="menu-hero-card food-menu"
          style={{ backgroundImage: `url(${foodBg})` }}
        >
          <h3>Food Menu</h3>
          <p>Fresh dishes and light bites</p>
          <button type="button" onClick={() => navigate('/menu/food')}>
            View Our Food
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;