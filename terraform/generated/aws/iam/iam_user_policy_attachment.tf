resource "aws_iam_user_policy_attachment" "tfer--ahmed-iam_IAMUserChangePassword" {
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
  user       = "ahmed-iam"
}

resource "aws_iam_user_policy_attachment" "tfer--ahmed-iam_PowerUserAccess" {
  policy_arn = "arn:aws:iam::aws:policy/PowerUserAccess"
  user       = "ahmed-iam"
}

resource "aws_iam_user_policy_attachment" "tfer--sama_IAMUserChangePassword" {
  policy_arn = "arn:aws:iam::aws:policy/IAMUserChangePassword"
  user       = "sama"
}
