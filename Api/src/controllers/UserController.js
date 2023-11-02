const axios = require ("axios");
const {User} = require ("../db");
const { Op, where } = require('sequelize');


const createUserController = async (
            name,
            lastName,
            birthdate,
            review,
            nationality
    )=>{
const newUser = await User.create({
            name,
            lastName,
            birthdate,
            review,
            nationality
});          

return newUser;
};

const deleteUserController = async(id) => await User.destroy({where: {id}});


// Esta funcion nos trae los user que tengan una fecha de borrado 
const getUserDeleteController = async (id) => {
    const deletedUsers = await User.findAll({
      where: {
        deletedAt: {
          [Op.not]: null, // Filtra usuarios con deletedAt no nulo (usuarios eliminados)
        },
      },
      paranoid: false, // Incluye registros eliminados en la consulta
    });
  
    return deletedUsers;
  };


  const getAllUserControllers = async () => {
    const allUserDb = await User.findAll();
    return allUserDb;
};

 const restoreUserController = async (id)=>{
        try {
            await User.restore({
                where : {id : id}
            })
        } catch (error) {
            throw new Error (error.message)
        }
 }

module.exports = {
    createUserController,
    deleteUserController,
    getUserDeleteController,
    getAllUserControllers,
    restoreUserController,
}