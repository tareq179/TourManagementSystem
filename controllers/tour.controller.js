const { getToursService, createTourService, updateTourtService, bulkUpdateTourService, deleteTourByIdService, bulkDeleteTourService } = require("../services/tour.services");
  
  exports.getTours = async (req, res, next) => {
    try {
    
  
  
      //{price:{$ gt:50}
      //{ price: { gt: '50' } }
      console.log(req.query)
  
      let  filters={...req.query};
      
       //sort , page , limit -> exclude
       const excludeFields = ['sort','page','limit']
       excludeFields.forEach(field=> delete filters[field])
  
       //gt ,lt ,gte .lte
      let  filtersString= JSON.stringify(filters)
      filtersString= filtersString.replace(/\b(gt|gte|lt|lte)\b/g , match=> `$${match}`)
       
      filters= JSON.parse(filtersString)
       
      
      
      const queries = {}
  
       if(req.query.sort){
          // price,qunatity   -> 'price quantity'
          const sortBy=req.query.sort.split(',').join(' ')
          queries.sortBy=sortBy
          console.log(sortBy);
       }
  
       if(req.query.fields){
          const fields=req.query.fields.split(',').join(' ')
          queries.fields=fields
          console.log(fields);
       }
  
       if(req.query.page){
  
         const {page=1, limit=10} = req.query; 
  
        const skip = (page - 1)*parseInt(limit);
        queries.skip=skip;
        queries.limit=parseInt(limit);
  
       }
  
       
  
      const tours = await getToursService(filters,queries);
  
      res.status(200).json({
        status: "success",
        data: tours,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "can't get the data",
        error: error.message,
      });
    }
  };
  
  exports.createTour = async (req, res, next) => {
    try {
      // save or create
  
      const result = await createTourService(req.body);
  
      result.logger();
  
      res.status(200).json({
        status: "success",
        messgae: "Data inserted successfully!",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: " Data is not inserted ",
        error: error.message,
      });
    }
  };
  
  exports.updateTour = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateTourtService(id, req.body);
  
      res.status(200).json({
        status: "succrss",
        message: "successfully update",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the prodict",
        error: error.message,
      });
    }
  };
  
  exports.bulkUpdateTour = async (req, res, next) => {
    try {
      const result = await bulkUpdateTourService(req.body);
  
      res.status(200).json({
        status: "succrss",
        message: "successfully update",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't update the prodict",
        error: error.message,
      });
    }
  };
  
  exports.deleteTourById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await deleteTourByIdService(id);
      console.log(result);
  
      if (!result.deletedCount) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't Delete the tour",
        });
      }
  
      res.status(200).json({
        status: "succrss",
        message: "successfully Delete the tour",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't Delete the prodict",
        error: error.message,
      });
    }
  };
  
  exports.bulkDeleteTour = async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await bulkDeleteTourService(req.body.ids);
  
      res.status(200).json({
        stauts: "success",
        message: "Successfully deleted the given tours",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't delete the given tours",
        error: error.message,
      });
    }
  };
  