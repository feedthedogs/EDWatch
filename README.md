# EDWatch
Watching high value trades on EtherDelta

I noticed that EtherDelta's UI was bad enough that quite frequently people were doing bad trades.

I had the idea that I could watch unconfirmed transactions on the network (someone else has to take the trade before I would know it existed), copy the high value trades, pay a higher fee and the miners would put me in front to win. (I later found out this is called frontrunning)

What I found when I threw this together is atleast 10 other people had the same idea, but I didn't really feel like putting more time into moving averages and profit calculating to beat the others; so here it is.


There is nothing special here in terms of code (I only put enough effort in to make it work in the least amount of time)

It is currently in an ASP.NET solution, but there is no server side functionality, so you can host it in whatever you want (I was thinking about a chrome addon)

I'll also add that I never actually transmitted a transaction (not 100% the transaction creation works) and the values for tokens would be a few weeks out of date and the scale would be wrong for quite a few.

So don't use it as is, modify it to work for you.

You can watch the transactions using MetaMask here https://feedthedogs.github.io/EDWatch/index.html

![alt text](https://github.com/feedthedogs/EDWatch/blob/master/edwatch.png)
