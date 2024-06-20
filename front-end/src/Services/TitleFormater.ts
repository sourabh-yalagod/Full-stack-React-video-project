export const TitleFormatar = (title:string):string =>{
    if(title.length > 30)
        return title.substring(0,30) + ". . . . ."
    return title
}