![Js数组排序.png](https://kedong.me/static/images/article/20210830163235数组排序.png)

### Js数组排序，上移下移置顶置底

置顶

```javascript
topRow(index,arr){
  arr.unshift(arr[index]);
  arr.splice(index+1,1);
  return arr
}
```


置底

```javascript
downRow(index,arr){
    arr.push(arr[index]);
    arr.splice(index,1);
    return arr;
}
```


上移
```js
upRow(index,arr){
  arr[index]=arr.splice(index-1, 1, arr[index])[0];
}
```

下移
```javascript
belowRow(index,arr){
  arr[index]=arr.splice(index+1, 1, arr[index])[0];
}
```

