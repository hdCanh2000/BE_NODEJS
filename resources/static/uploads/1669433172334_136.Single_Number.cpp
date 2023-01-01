#include <bits/stdc++.h>
using namespace std;

int main() {
	int t; cin >> t;
	while(t--) {
		int n; cin >> n;
		int arr[n];
		for(int i = 0; i < n; i++) {
			cin >> arr[i];
		}
		if(arr.length == 1) cout << arr[0] << endl;
		
	}
	return 0;
}
