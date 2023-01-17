const Tour = require('../models/tour');

exports.getToursService = async (filters, queries) => {

    const tours = await Tour.find(filters)
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy)
  
    const total = await Tour.countDocuments(filters)
    const page = Math.ceil(total/queries.limit)
    return {total,page,tours: tours};
  };
  

exports.createTourService =  async (data) =>{
    const tour = await Tour.create(data)
    return tour
}

exports.updateTourtService =  async (tourId, data) =>{
    const result = await Tour.updateOne({_id:tourId}, {$set:data},{
        runValidators:true
    })
    return result
}

exports.bulkUpdateTourService =  async (data) =>{
    const tours = [];

    data.ids.forEach(tour => {
        tours.push(Tour.updateOne({_id: tour.id}, tour.data))
    });

    const result =await Promise.all(tours);
    console.log(result);
    return result
}

exports.bulkDeleteTourService = async (ids) => {
    const result = await Tour.deleteMany({});
  
    return result;
  };

exports.deleteTourByIdService =  async (id) =>{
    const result = await Tour.deleteOne({_id:id})
    return result;
}