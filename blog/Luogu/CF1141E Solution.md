---
date: 2024-10-16T18:13
authors: [zwz6666]
tags: [luogu,solution]
---

# CF1141E Superhero Battle 题解
[题目传送门](https://www.luogu.com.cn/problem/CF1141E)
## 题目大意
给定血量 $h$ 和 $n$ 个整数 $d_1,d_2,\dots,d_n$,
每轮 $n$ 次操作,第 $i$ 次操作使 $h=h+d_i$。
问在进行第几次操作后，$h \le 0$ 。 
如果永远无法死亡，输出 $-1$。
<!-- truncate -->

## 解题思路
- 首先枚举第一轮的 $n$ 次操作，记录最大扣血 $x$ 与  $n$ 次操作的总扣血 $sum$ 。同时特判第一轮就死亡（$h \le 0$）的情况，此时直接输出并结束程序。

- 若第一轮没有死亡，且 $sum \ge 0$，一定不会死亡。

- 若第一轮没有死亡，且 $sum < 0$，一定会死亡。此时先找到最小的轮数，使 $h \le x$。之后再模拟一轮即可。

详见代码。
## AC Code
```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long
const int maxn = 2e5+5;
ll d[maxn],h,n;
ll x=0;
int main() {
	cin>>h>>n;
	ll sum=0;
	for(int i=1;i<=n;i++){
		cin>>d[i];
		sum-=d[i];
		if(h-sum<=0){
			cout<<i;
			return 0;
		}
		x=max(x,sum);//最多扣x 
	if(ans<=0){
		cout<<-1;
		return 0;
	}
	ll ans=0;
	ans=(h-x)/sum;
	h-=ans*sum;
	if(h>x)ans++,h-=sum;//最少循环ans轮
	ans*=n;//ans轮ans*n次攻击
	//此时再来一轮一定可以死亡，但不一定是在总受伤最大时，可能更早
	for(int i=1;i<=n;i++){
		ans++;
		h+=d[i];
		if(h<=0){
			cout<<ans;
			break;
		}
	}
	return 0;
} 
```