export interface ResultI {
 STATUS_CODE: number,
 STATUS_DESC: string,
 TOTAL_ROWS?: number,
 DATA?:any   
};

export class ResultSet{
    static fromResultToResulSet(queryResult: any): ResultI{

        const answer: ResultI = {
            STATUS_CODE: 400,
            STATUS_DESC: "no se recibió ningún resultado",
            TOTAL_ROWS: 0,
            DATA: []
        }
        
       if (queryResult.result.recordsets.length > 0) {

                const data:any = queryResult.result.recordsets;

                for (let i in data) {
                    if (data[i][0]) {

                        if (data[i][0].STATUS_CODE) {
                            answer.STATUS_CODE = data[i][0].STATUS_CODE;
                        }
                        if (data[i][0].STATUS_DESC) {
                            answer.STATUS_DESC = data[i][0].STATUS_DESC;
                        }
                        if (data[i][0].TOTAL_ROWS) {
                            answer.TOTAL_ROWS = data[i][0].TOTAL_ROWS;
                        }
                        
                    }
                }
             
           if (queryResult.result.recordset) {    
                    
               answer.DATA = queryResult.result.recordset;
               }
                return answer;
            
              };
        
        return answer;

        
    }
}