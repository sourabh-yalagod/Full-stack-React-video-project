import{u as p,g as x,r as b,n as g,j as e,N as n,L as h,e as f,z as o}from"./index-BYajJq-C.js";import{u as y}from"./useMutation-CM6hDA53.js";import{u as j}from"./index.esm-DVqaGF1d.js";import{V as v}from"./video-DObkfH8g.js";import"./utils-km2FGkQ4.js";const q=()=>{const d=p(),{userId:a}=x();b.useState(!1);const u=g(),{register:r,handleSubmit:m,formState:{errors:s}}=j({defaultValues:{title:"",description:"",thumbnail:null,videoFile:null}}),l=y({mutationFn:async t=>(await f.post("/api/v1/videos/upload-video",t,{headers:{"Content-Type":"multipart/form-data"}})).data,onSuccess:t=>{u.invalidateQueries({queryKey:["userProfile"]}),o({title:"Video uploaded successfully",description:t==null?void 0:t.message,duration:1500,variant:"default"}),d(`/signin/user-profile/${a}`)},onError:t=>{o({title:"Video uploaing failed . . . . !",description:t==null?void 0:t.message,duration:1500,variant:"destructive"})}}),c=async t=>{const i=new FormData;i.append("title",t.title),i.append("description",t.description),i.append("videoFile",t.videoFile[0]),i.append("thumbnail",t.thumbnail[0]),l.mutate(i)};return e.jsx("div",{className:"min-h-screen grid place-items-center bg-gray-100 dark:bg-black px-5",children:e.jsxs("div",{className:"text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 min-w-[350px] w-full max-w-[450px] sm:min-w-sm rounded-xl py-7 grid place-items-center bg-white dark:bg-black text-sm space-y-7 px-3",children:[e.jsxs("div",{className:"flex w-full justify-between p-4",children:[e.jsxs("div",{className:"flex gap-2 items-center cursor-pointer",children:[e.jsx("img",{className:"size-6 sm:size-9 rounded-full",src:"https://lh3.googleusercontent.com/rormhrw_yZt2v1OKZBaiFCSt8b8QU02kEKiuilfgnpGkOMQd87xm7b7SyIlGoHsL18M",alt:"Logo"}),e.jsx("p",{className:"text-slate-800 text-lg sm:text-xl font-semibold dark:text-white",children:"Video-Tube"})]}),e.jsxs("h1",{className:"sm:text-xl flex gap-3 items-center font-semibold cursor-pointer animate-pulse",children:[e.jsx(v,{}),"Upload Video"]})]}),e.jsxs("form",{className:"space-y-6 w-full grid text-[12px] sm:text-[16px]",onSubmit:m(c),children:[e.jsxs("div",{className:"flex justify-between relative",children:[e.jsx("label",{htmlFor:"title",children:"Title:"}),e.jsx("input",{type:"text",placeholder:"Title",id:"title",...r("title",{required:"Title is required"}),className:"bg-transparent border-b-2 outline-none border-gray-700 dark:border-gray-500 ml-3 w-full"}),s.title&&e.jsx("span",{className:"text-red-500 absolute -bottom-5 text-[11px]",children:s.title.message})]}),e.jsxs("div",{className:"grid justify-between relative",children:[e.jsx("label",{htmlFor:"description",children:"Description:"}),e.jsx("textarea",{id:"description",placeholder:"Description...",...r("description",{required:"Description is required"}),className:"bg-transparent border-[1px] p-1 outline-none min-w-[320px] text-[12px] border-gray-700 dark:border-gray-500 rounded-sm"}),s.description&&e.jsx("span",{className:"text-red-500 absolute -bottom-5 text-[11px] z-20",children:s.description.message})]}),e.jsxs("div",{className:"flex justify-between relative",children:[e.jsx("label",{htmlFor:"thumbnail",children:"Thumbnail:"}),e.jsx("input",{type:"file",id:"thumbnail",...r("thumbnail",{required:"Thumbnail is required"}),className:"bg-transparent outline-none border-gray-700 dark:border-gray-500 ml-3"}),s.thumbnail&&e.jsx("span",{className:"text-red-500 absolute -bottom-5 text-[11px]",children:s.thumbnail.message})]}),e.jsxs("div",{className:"flex justify-between relative",children:[e.jsx("label",{htmlFor:"videoFile",children:"Video File:"}),e.jsx("input",{type:"file",id:"videoFile",...r("videoFile",{required:"Video file is required"}),className:"bg-transparent outline-none border-gray-700 dark:border-gray-500 ml-3"}),s.videoFile&&e.jsx("span",{className:"text-red-500 absolute -bottom-5 text-[11px]",children:s.videoFile.message})]}),e.jsxs("div",{className:"flex w-full justify-around items-center",children:[e.jsx(n,{className:"bg-red-500 text-center hover:bg-red-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4",to:"/",children:"Home"}),e.jsx(n,{className:"bg-green-500 text-center hover:bg-green-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 rounded",to:`/signin/user-profile/${a}`,children:"Profile"}),e.jsx("button",{type:"submit",className:"bg-blue-500 hover:bg-blue-700 outline-none border-gray-700 dark:border-gray-500 font-bold py-2 px-4 rounded",children:l.isPending?e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsx(h,{className:"animate-spin"}),"Uploading..."]}):"Upload Video"})]})]})]})})};export{q as default};