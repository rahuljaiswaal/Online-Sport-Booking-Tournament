#include <iostream>
	#include <algorithm>
	#include <vector>
	#include <stack>
using namespace std;
int main()
{
    vector<int> v = {7,4,8,2,9};
    cout<<"hello"<<endl;
	vector<int> ans;
    int max = v[0];
    ans.push_back(v[0]);
    for(int i=1; i<v.size(); i++){
        if(v[i]>max){
            ans.push_back(v[i]);
            max = v[i];
        }
    }
	for(int i=0; i<ans.size(); i++){
		cout<<ans[i]<<" ";
	}
	
}