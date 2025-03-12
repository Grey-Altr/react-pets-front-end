import { useState, useEffect } from "react";
import * as petService from './services/petService.js';
import PetList from "./components/PetList/PetList.jsx";
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from "./components/PetForm/PerForm.jsx";

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelected(pet);
    setIsFormOpen(false);
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);

      if (newPet.err) {
        throw new Error(newPet.err);
      }

      setPets([newPet, ...pets]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    };
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index();
        
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err);
        };

        setPets(fetchedPets);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPets();
  }, []);
  
  return (
    <>
      <PetList
      pets={pets}
      handleSelect={handleSelect}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm handleAddPet={handleAddPet} />
      ) : (
        <PetDetail selected={selected} />
      )}
    </>
  );
};

export default App;
