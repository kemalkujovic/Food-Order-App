import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const url =
  "https://react-df14a-default-rtdb.europe-west1.firebasedatabase.app/melas.json";
const AvailableMeals = () => {
  const [meals, setMealas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    const fetchMeals = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);

        const responseData = response.data;
        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
        setMealas(loadedMeals);
      } catch (error) {
        setHttpError("Something went wrong!");
      }

      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
