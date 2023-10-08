require('dotenv').config();
mongoose = require('mongoose')

const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema
  ({
    name:String,
    age:Number,
    favoriteFoods:[String]
  });

const Person = mongoose.model('Person', personSchema);

// Create and save a person
function createAndSavePerson(done) {
  const personData = {
    name: 'John Doe',
    age: 30,
    favoriteFoods: ['Pizza', 'Ice Cream']
  };

  // Create a new document instance using the Person model constructor
  const person = new Person(personData);

  // Save the document instance with a callback
  person.save(function(err, data) {
    if (err) {
      // Handle the error here
      console.error(err);
    } else {
      // Document saved successfully, you can work with 'data' here
      console.log('Document saved:', data);
    }
    
    // Call the callback when done
    done(err, data);
  });
  
}

  let arrayOfPeople = [
    {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
    {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
    {name: "Robert", age: 78, favoriteFoods: ["wine"]}
  ];

  var createManyPeople = function(arrayOfPeople, done) {
    Person.create(arrayOfPeople, (err, createdPeople) => {
      if (err)
      {
        console.log(err);
      }
      else
      {
        done(null, createdPeople);
      }
      
    });
  };

Person.find({name:'Sol'}, (err, data) => 
  {
    if (err)
    {
      console.log(err)
    }
    else
    {
      console.log(data)
    }
  });
const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, data) => {
    if (err)
    {
      console.log(err);
    }
    else{
      done(null, data);
    }
  })
  //done(null /*, data*/);
};

Person.findOne({favoriteFoods:{$all:["roast chicken"]}}, (err, data) => {
  if (err)
  {
    console.log(err);
  }
  else
  {
    console.log(data);
  }
})


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:{$all:[food]}}, (err, data) => {
    if (err)
    {
      console.log(err)
    }
    else
    {
      done(null, data);
    }
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) =>{
    if (err)
    {
      console.log(err)
    }
    else
    {
        done(null, data);
    }
  })
  //done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, data) => {
    if (err)
    {
      console.log(err);
    }
    else
    {
      data.favoriteFoods.push(foodToAdd);
      data.save((err,data) => {
        if (err)
        {
          console.log(err)
        }
        else
        {
            done(null, data);
        }
      })
    }
  })
  

  //done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, { new: true }, (err, data) => {
    if (err)
    {
      console.log(err);
    }
    else
    {
       done(null, data);
    }
  })

  //done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id:personId}, (err, data) => {
    if (err)
    {
      console.log(err);
    }
    else
    {
      done(null, data);
    }
    
  })
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, data) => {
    if (err)
    {
      console.log(err);
    }
    else
    {
      done(null, data);
    }
  })

  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: 'asc' })
    .limit(2)
    .select('name favoriteFoods')
    .exec((err, data) => {
      if (err)
      {
        console.log(err);
      }
      else
      {
        done(null, data)
      }
    });
  };

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: 'asc' })
    .limit(2)
    .select('name favoriteFoods')
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        done(null, data);
      }
    });
};
  //done(null /*, data*/);

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;