export const TitleFormatar = (title:string):string =>{
    if(title.length > 25)
        return title.substring(0,25) + ". . . . ."
    return title
}