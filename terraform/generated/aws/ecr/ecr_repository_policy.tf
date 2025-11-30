resource "aws_ecr_repository_policy" "tfer--jack-backend" {
  policy = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ],
      "Effect": "Allow",
      "Principal": "*",
      "Sid": "PublicRead"
    }
  ],
  "Version": "2012-10-17"
}
POLICY

  region     = "eu-north-1"
  repository = "jack-backend"
}

resource "aws_ecr_repository_policy" "tfer--jack-frontend" {
  policy = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:BatchCheckLayerAvailability"
      ],
      "Effect": "Allow",
      "Principal": "*",
      "Sid": "PublicRead"
    }
  ],
  "Version": "2012-10-17"
}
POLICY

  region     = "eu-north-1"
  repository = "jack-frontend"
}
