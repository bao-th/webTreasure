## 还原文件更改
git chekcout -- <file>

## 暂存
- git add .                   //暂存所有文件
- git add <file>              //暂存指定文件

## 取消暂存
- git reset HEAD .            //取消暂存所有文件
- git reset HEAD <file>       //取消暂存指定文件

## 提交
- git commit -m <msg>         //提交全部暂存文件

## 重置提交
- git reset HEAD^             //默认，重置到上一版本
- git reset --mixed HEAD~1    //等于默认，重置到上一版本，撤销commit，撤销add，保留改动
- git reset --soft  HEAD~1    //撤销commit，不撤销add，保留改动
- git reset --hard  HEAD~1    //撤销commit，撤销add，撤销改动

    `HEAD~1可以用<commit ID>版本id代替，四位即可` 

    `重置单个文件，后面可加<file>`

    `HEAD^^ == HEAD~2 == 前二个版本`

## 推送
- git push                    //推送到当前所在分支

## 拉取
- git pull                    //从当前所在分支拉取

## 查看
- git status                  //查看当前状态
- git log                     //查看zuijin3次提交，按q退出
- git --pretty=oneline        //查看单行提交记录