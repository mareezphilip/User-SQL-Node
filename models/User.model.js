

module.exports=(sequelize , Datatype)=>{
    const User =sequelize.define("User" , {
         id: {
            type: Datatype.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: Datatype.STRING,
            allowNull: false
          },
          email: {
            type: Datatype.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            },
          },
          password: {
            type: Datatype.STRING,
            allowNull: false , 
            validate: {
              isPasswordValid(value) {
                const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                // if (!passwordPattern.test(value)) {
                //   throw new Error(
                //     'Password must contain at least 8 characters, including at least one letter and one number'
                //   );
                // }
              },
            },
          },
          gender: {
            type: Datatype.STRING,
            allowNull: true
          },
          phone: {
            type: Datatype.STRING,
            allowNull: true
          } ,
          token:{
            type: Datatype.STRING,
            allowNull: true
          }
      
    })
    return User
}