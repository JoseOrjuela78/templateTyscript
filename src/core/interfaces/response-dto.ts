export interface IResponseDto<Model, Response>{
    fromDomainToResponse(model: Model | Model[]): Response | Response[];    
};