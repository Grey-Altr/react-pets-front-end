import { useState, useEffect } from "react";
import * as petService from './services/petService.js';
import PetList from "./components/PetList/PetList.jsx";
import PetDetail from './components/PetDetail/PetDetail.jsx';
import PetForm from "./components/PetForm/PetForm.jsx";

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelect = (pet) => {
    setSelected(pet);
    setIsFormOpen(false);
  };

  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
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

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);
      
      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = pets.map((pet) => (
        pet._id !== updatedPet._id ? pet : updatedPet
      ));

      setPets(updatedPetList);
      setSelected(updatedPet);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    };
  };

  const handleDeletePet = async (petId) => {
    
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
        <PetForm
          handleAddPet={handleAddPet}
          selected={selected}
          handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail
        handleFormView={handleFormView}
        selected={selected} />
      )}
    </>
  );
};

export default App;
